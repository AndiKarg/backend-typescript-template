import { Router } from 'express';

/**
 * @startuml
* testdot
* @enduml
 */
export interface Routes {
  path?: string;
  router: Router;
}
