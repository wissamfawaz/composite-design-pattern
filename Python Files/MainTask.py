from Task import Task
class MainTask(Task):
    subTasks = list()
    optionalTasks = list()

    def _init_(self):
        pass
    def createSubTask():
        MainTask.subTasks.append(MainTask)
    def getSubTask(self, idx):
        return MainTask.subTasks[idx]
    def deleteSubTask(idx):
        MainTask.subTasks.remove(MainTask.subTasks[idx])
    def createOptionalTask():
        MainTask.optionalTasks.append(MainTask)
    def getOptionalTask(self, idx):
        return MainTask.optionalTasks[idx]
    def deleteOptionalTask(idx):
        MainTask.optionalTasks.remove(MainTask.optionalTasks[idx])
    def calculateBudget():
        totalBudget = 0

        for subTask in MainTask.subTasks:
            totalBudget += subTask.getBudget()
        for optionalTask in MainTask.optionalTasks:
            totalBudget += optionalTask.getBudget()

        return totalBudget
        

