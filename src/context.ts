import { Controller } from "./controller";
// import { HealthController } from "./health/health.controller";
// import { MailingListController } from "./mailing-list/mailing.list.controller";
// import { MailingListRepository } from "./mailing-list/mailing.list.repository";
// import { MailingListService } from "./mailing-list/mailing.list.service";


//Repositories: 
// const mailingListRepository = new MailingListRepository();

//Services:
// const mailingListService = new MailingListService(mailingListRepository);

//Controllers:
// const mailingListController = new MailingListController(mailingListService);
// const healthController = new HealthController();

export const UnprotectedControllers = [
    // mailingListController,
    // healthController,
].map((c: Controller) => c.router);