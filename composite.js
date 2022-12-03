class Task{
    getTaskName(){
        return this.taskName;
    }
    setTaskName(taskName){
        this.taskName=taskName;
    }
    getStartDate(){
        return this.startDate;
    }
    setStartDate(startDate){
        this.startDate=startDate;
    }
    getEndDate(){
        return this.endDate;
    }
    setEndDate(endDate){
        this.endDate=endDate;
    }
    getDescription(){
        return this.description;
    }
    setDescription(description){
        this.description=description;
    }
    getBudget(){
        return this.budget;
    }
    setBudget(budget){
        this.budget=budget;
    }
}

class Project extends Task {
    constructor(){
        super();
        this.milestones=[];
    }
	
	createMilestone() {
		this.milestones.push(new Milestone())
	}
	
	getMilestone(idx) {
		return this.milestones[idx];
	}
	
	deleteMilestone(idx) {
		this.milestones.splice(idx,1);
	}

    clearProject() {
        for(i = 0; idx < this.milestones.length; i++) {
            this.milestones.splice(idx,1);
        }
    }
	
}

class Milestone extends Task {
	constructor(){
        super();
        this.maintasks=[];
    }
	
	createMainTask() {
		this.maintasks.push(new MainTask());
	}
	
	getMainTask(idx) {
		return this.maintasks[idx];
	}
	
	deleteMainTask(idx) {
		this.maintasks.splice(idx,1);
	}
	
}

class MainTask extends Task{
    constructor(){
        super();
        this.subtasks=[];
        this.opTask=[]
    }
    createSubTask(){
        this.subtasks.push(new Task());
    }
        
    getSubTask(idx){
        return subtasks[idx];
    }
        
    deleteSubTask(idx){
        this.subtasks.splice(idx, 1);
    }
        
    createOptionalTask(){
        this.opTask.push(new Task())
    }

    getOptionalTask(idx){
        return this.opTask[idx];
    }
    deleteOptionalTask(idx){
        this.opTask.splice(idx,1);
    }

    calculateBudget(){
        var totalBudget = 0

        for(let subtask of subtasks) {
			totalBudget += subtask.getBudget();
		}
		for(let optionalTask of optionalTasks) {
			totalBudget += optionalTask.getBudget();
		}
		return totalBudget;
    }
}

export {Task, MainTask, Milestone, Project};