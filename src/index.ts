import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import { INotebookTracker } from '@jupyterlab/notebook';

import '../style/index.css';


/**
 * Initialization data for the full-screen-button extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'full-screen-button',
  autoStart: true,
  requires: [INotebookTracker],
  activate: (
    app: JupyterLab,
    notebooks: INotebookTracker
  ): void => {

    console.log("Yunfei's buttons are activited");

    notebooks.activeCellChanged.connect((sender, )=>{

      // first button
      [].forEach.call(document.querySelectorAll('.fullScreenBtn'), function (el:HTMLElement) {
        el.remove();
      });
      let b1 = document.createElement('button');
      b1.className = "fullScreenBtn";
      b1.classList.add("ScreenBtn");
      b1.title = "cell in full-screen";
      b1.addEventListener("click", (e:Event) => getfullscreen());
      
      // second button
      [].forEach.call(document.querySelectorAll('.fullScreenBtnOP'), function (el:HTMLElement) {
        el.remove();
      });
      let b2 = document.createElement('button');
      b2.className = "fullScreenBtnOP";
      b2.classList.add("ScreenBtn");
      b2.title ="only show output";
      b2.addEventListener("click", (e:Event) => getfullscreenOP());

      // 3rd button
      let b3 = document.createElement('button');
      b3.className = "exitFullScreenBtn";
      b3.classList.add("ScreenBtn");
      b3.title ="exit full screen mode"
      b3.addEventListener("click", (e:Event) => exitFullScreen());

      // create 1st and 2nd button if needed
      sender.activeCell.node.getElementsByClassName("jp-InputPrompt").item(0).appendChild(b1);

      if (sender.activeCell.node.getElementsByClassName("jp-OutputPrompt").length > 0)
      {
        sender.activeCell.node.getElementsByClassName("jp-InputPrompt").item(0).appendChild(b2);
      }
      
       
      // full-screen function
      function getfullscreen(){

        console.log(sender.activeCell.node);
        // make notebook window full screen

        
        [].forEach.call(document.querySelectorAll('.p-DockPanel'), function (notebook_window:HTMLElement) {
          if (notebook_window.contains(sender.activeCell.node))
          {notebook_window.classList.add("fullScreenWin");}
          });
        [].forEach.call(document.querySelectorAll('.jp-NotebookPanel'), function (P1:HTMLElement) {
          P1.classList.add("fullScreenHide");
            });
        [].forEach.call(document.querySelectorAll('.jp-NotebookPanel-notebook'), function (P2:HTMLElement) {
          P2.classList.add("fullScreenHide");
          });
        [].forEach.call(document.querySelectorAll('.jp-NotebookPanel'), function (notebook_inner_window:HTMLElement) {
          if (notebook_inner_window.contains(sender.activeCell.node))
          {notebook_inner_window.classList.add("fullScreenWin");}
          });
        [].forEach.call(document.querySelectorAll('.jp-NotebookPanel-notebook'), function (notebook_inin_window:HTMLElement) {
          if (notebook_inin_window.contains(sender.activeCell.node))
          {notebook_inin_window.classList.add("fullScreenWin");}
          });
      
        // hide other elements
        document.getElementById("jp-top-panel").classList.add("fullScreenHide");
        document.getElementById("jp-left-stack").classList.add("fullScreenHide");
        [].forEach.call(document.querySelectorAll('.p-TabBar'), function (TabBar:HTMLElement) {
          TabBar.classList.add("fullScreenHide");
           });
        [].forEach.call(document.querySelectorAll('.jp-NotebookPanel-toolbar'), function (toolbar:HTMLElement) {
          toolbar.classList.add("fullScreenHide");
           });
        [].forEach.call(document.querySelectorAll('.p-DockPanel-tabBar'), function (DockPanel_tabBar:HTMLElement) {
          DockPanel_tabBar.classList.add("fullScreenHide");
          });

        // hide all cells
        [].forEach.call(document.querySelectorAll('.jp-Cell'), function (ec:HTMLElement) {
          ec.classList.add("fullScreenHide");
        });

        // only show the activated cell
        sender.activeCell.node.classList.remove("fullScreenHide");
        // remove full screen buttons
        [].forEach.call(document.querySelectorAll('.fullScreenBtn, .fullScreenBtnOP'), function (fb:HTMLElement) {
          fb.remove();
        });

        // create exit button   
        sender.activeCell.node.getElementsByClassName("jp-InputPrompt").item(0).appendChild(b3);

       }

      function getfullscreenOP(){
      
      getfullscreen();
      

      // only show output (hide input)
      [].forEach.call(document.querySelectorAll('.jp-Cell-inputWrapper'), function (ip:HTMLElement) {
        ip.classList.add("fullScreenHide");
      });

      // create exit button
      sender.activeCell.node.getElementsByClassName("jp-OutputPrompt").item(0).appendChild(b3);
      console.log("function is activated!");
      

      } 



      function exitFullScreen(){
        
  
        // remove all hide class
        [].forEach.call(document.querySelectorAll('.fullScreenHide'), function (hideEl:HTMLElement) {
          hideEl.classList.remove("fullScreenHide");
        });

        // remove all fullscreen class
        [].forEach.call(document.querySelectorAll('.fullScreenWin'), function (hideEl:HTMLElement) {
          hideEl.classList.remove("fullScreenWin");
        });

        // remove exit button
        [].forEach.call(document.querySelectorAll('.exitFullScreenBtn'), function (eb:HTMLElement) {
          eb.remove();
        });

        // create 1st and 2nd button if needed
        sender.activeCell.node.getElementsByClassName("jp-InputPrompt").item(0).appendChild(b1);

        if (sender.activeCell.node.getElementsByClassName("jp-OutputPrompt").length > 0)
        {
          sender.activeCell.node.getElementsByClassName("jp-InputPrompt").item(0).appendChild(b2);
        }
  
        } 




    });
  }
};

export default extension;
