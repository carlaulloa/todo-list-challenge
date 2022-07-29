import { inject, injectable } from "inversify";
import { TaskStateRepository } from "./task-state.repository";
import { EntityHelper } from "../../helper/entity.helper";
import { SERVICES_IDENTIFIERS } from "../../bootstrap/container.types";

@injectable()
export class TaskStateSeed {
  constructor(
    @inject(SERVICES_IDENTIFIERS.TASK_STATE_REPOSITORY)
    private readonly taskStateRepository: TaskStateRepository
  ) {}

  async insertAll(): Promise<any> {
    const data = [
      {
        name: "Nuevo",
      },
      {
        name: "Completado",
      },
    ];
    const formattedData = data.map((item) => ({
      ...item,
      alias: EntityHelper.getAliasFromString(item.name),
    }));
    console.log("Removing task-states...");
    await this.taskStateRepository.removeMany({});
    console.log("Removed task-states");
    const { data: insertedData } = await this.taskStateRepository.insertMany(
      formattedData
    );
    console.log("Inserted seeds");
    return insertedData;
  }
}
