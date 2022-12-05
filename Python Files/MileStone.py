import Task
import MainTask

class MileStone(Task):
    mainTasks = list()

    def _init_(self):
        pass
    def createMainTask():
        MileStone.mainTasks.append(MileStone)
    def getMainTask(self, idx):
        return MileStone.mainTasks[idx]
    def deleteMainTask(self, idx):
        MileStone.mainTasks.remove(MileStone.mainTasks[idx])
    