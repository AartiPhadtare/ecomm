import {
  concatAll,
  exhaustAll,
  mergeAll,
  MonoTypeOperatorFunction,
  Observable,
  OperatorFunction,
  Subject,
  switchAll,
  takeUntil,
  finalize,
  tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export class RxRunner<InternalType> {
  private readonly dispatcher?: Subject<Observable<InternalType>>;
  private readonly instanceId: string;
  private operationCounter = 0;
  private activeSubscriptions = new Set<number>();

  public static firstEmit<InternalType>(logLabel?: string): RxRunner<InternalType> {
    return new RxRunner<InternalType>(exhaustAll(), logLabel || 'firstEmit');
  }

  public static lastEmit<InternalType>(logLabel?: string): RxRunner<InternalType> {
    return new RxRunner<InternalType>(switchAll(), logLabel || 'lastEmit');
  }

  public static queue<InternalType>(logLabel?: string): RxRunner<InternalType> {
    return new RxRunner<InternalType>(concatAll(), logLabel || 'queue');
  }

  public static parallel<InternalType>(logLabel?: string): RxRunner<InternalType> {
    return new RxRunner<InternalType>(mergeAll(), logLabel || 'parallel');
  }

  // TODO: previous implementation breaks test
  private constructor(operator: OperatorFunction<Observable<InternalType>, InternalType>, logLabel: string = 'RxRunner') {
    this.instanceId = `${logLabel}-${Math.random().toString(36).substr(2, 9)}`;
    this.dispatcher = new Subject<Observable<InternalType>>();

    console.log(`🚀 [${this.instanceId}] RxRunner instance created`);

    this.dispatcher.pipe(
      tap(() => console.log(`📥 [${this.instanceId}] Dispatcher received new observable`)),
      operator,
      takeUntilDestroyed(),
      finalize(() => {
        console.log(`🔚 [${this.instanceId}] RxRunner finalized - all subscriptions cleaned up`);
        console.log(`📊 [${this.instanceId}] Final stats: ${this.activeSubscriptions.size} active subscriptions at cleanup`);
      })
    ).subscribe({
      next: (value) => console.log(`✅ [${this.instanceId}] Operation completed successfully`, value),
      error: (error) => console.error(`❌ [${this.instanceId}] Operation failed`, error),
      complete: () => console.log(`🏁 [${this.instanceId}] All operations completed`)
    });
  }

  public add(operation: Observable<InternalType>): void {
    const operationId = ++this.operationCounter;

    console.log(`➕ [${this.instanceId}] Adding operation #${operationId}`);

    const trackedOperation = operation.pipe(
      tap({
        subscribe: () => {
          this.activeSubscriptions.add(operationId);
          console.log(`🔄 [${this.instanceId}] Operation #${operationId} started executing...`);
          console.log(`� [${this.instanceId}] Active subscriptions: ${this.activeSubscriptions.size}`);
        }
      }),
      finalize(() => {
        this.activeSubscriptions.delete(operationId);
        console.log(`🗑️ [${this.instanceId}] Operation #${operationId} completed and unsubscribed`);
        console.log(`📉 [${this.instanceId}] Remaining active subscriptions: ${this.activeSubscriptions.size}`);
      })
    );

    this.dispatcher?.next(trackedOperation);
  }

  public getActiveSubscriptionsCount(): number {
    return this.activeSubscriptions.size;
  }

  public getInstanceId(): string {
    return this.instanceId;
  }
}
