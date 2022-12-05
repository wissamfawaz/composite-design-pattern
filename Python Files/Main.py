import Project
import MileStone
import Task

class Main():
    project1 = Project

    project1.setTaskName("Project 1")
    project1.createMileStone()

    m1 = MileStone 
    m1 = project1.getMileStone(0)
    m1.setTaskName("Milestone 1")

    mt1 = Task
    m1.createMainTask()
    mt1 = m1.getMainTask(0)

    mt1.setTaskName("Finish Backend")
    mt1.setDescription("Literally Hell")
    mt1.setStartDate("11/20/2022")
    mt1.setEndDate("11/20/2023")

    mt1.setBudget(mt1.calculateBudget())
