class Task():
   
    TaskName = str()
    startDate = str()
    endDate = str()
    description = str()
    budget = float()

    def __init__(self):
        pass

    def getTaskName(self):
       
         return self.TaskName

    def setTaskName(self, taskName):
       
        self.TaskName = taskName

    def getStartDate(self):
        
        return self.startDate

    def setStartDate(self, startDate):
       
        self.startDate = startDate

    def getEndDate(self):
        
        return self.endDate

    def setEndDate(self, endDate):
       
        self.endDate = endDate

    def getDescription(self):
       
        return self.description

    def setDescription(self, description):
       
        self.description = description

    def getBudget(self):
        
        return self.budget

    def setBudget(self, budget):
       
        self.budget = budget

    def calculateBudget(self):
       
        return self.budget
