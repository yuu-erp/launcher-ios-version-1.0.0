import { DomainEvent } from "@core/domain/events";

export interface ApplicationEventHandler<
  IDomainEvent extends DomainEvent,
  Response = unknown
> {
  handle(domainEvent: IDomainEvent): Promise<Response> | Promise<void>;
}
