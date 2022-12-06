import Task
import MileStone

class Project(object.Task):
    milestones = list()

    def _init_(self):
        pass
    def createMileStone():
        Project.milestones.append(MileStone)
    def getMileStone(self, idx):
        return Project.milestones[idx]
    def deleteMileStone(self, idx):
        Project.milestones.remove(Project.milestones[idx])

    

    



