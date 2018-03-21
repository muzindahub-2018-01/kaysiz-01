import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo'
import { ArchivedTodosPage } from '../archived-todos/archived-todos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];
  public reorderIsEnabled = false;

  constructor(private todoService: TodoProvider, public navCtrl: NavController, private alertController: AlertController, private toastController:ToastController) {
    this.todos = this.todoService.getTodos();
  }

  archiveTodo(todoIndex){
    this.todoService.archiveTodo(todoIndex);
  }

  toggleReorder(){
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event){
    reorderArray(this.todos, $event);
  }

  goToArchivePage(){
    this.navCtrl.push(ArchivedTodosPage);
  }

  openTodoAlert(){
    let addTodoAlert = this.alertController.create({
      title: "Add a Todo",
      message: "Enter your Todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Todo",
          handler: (inputData) => {
            let todoText;
            todoText = inputData.addTodoInput;
            this.todoService.addTodo(todoText);
          }
        }
      ]
    });
    addTodoAlert.present();
  }

  editTodo(todoIndex){
    let editTodoAlert = this.alertController.create({
      title: "Edit A Todo",
      message: "Edit Your Todo",
      inputs: [
        {
          type: "text",
          name: "editTodoInput",
          value: this.todos[todoIndex]
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Edit Todo",
          handler: (inputData)=> {
            let todoText;
            todoText = inputData.editTodoInput;
            this.todoService.editTodo(todoText, todoIndex);

            editTodoAlert.onDidDismiss(()=> {
              let editTodoToast = this.toastController.create({
                message: "Todo Edited",
                duration: 2000
              });
              editTodoToast.present();
            });

          }
        }
      ]
    });
    editTodoAlert.present();
  }
}
