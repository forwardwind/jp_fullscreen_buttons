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
      b1.innerHTML = "<div>cell in full-screen</div>";
      sender.activeCell.node.insertBefore(b1, sender.activeCell.node.getElementsByClassName("jp-Cell-inputWrapper").item(0));

      let btns: HTMLCollection = document.getElementsByClassName("fullScreenBtn");
      
      for(let i = 0;i<btns.length;i++){
        btns.item(i).addEventListener("click", (e:Event) => getfullscreen());
      }
      // second button
      [].forEach.call(document.querySelectorAll('.fullScreenBtnOP'), function (el:HTMLElement) {
        el.remove();
      });
      let b2 = document.createElement('button');
      b2.className = "fullScreenBtnOP";
      b2.classList.add("ScreenBtn");
      b2.innerHTML = "<div>output in full-screen</div>";
      sender.activeCell.node.insertBefore(b2, sender.activeCell.node.getElementsByClassName("jp-Cell-outputWrapper").item(0));

      let btns2: HTMLCollection = document.getElementsByClassName("fullScreenBtnOP");
      for(let i = 0;i<btns2.length;i++){
        btns2.item(i).addEventListener("click", (e:Event) => getfullscreenOP());
      }
       
      // full-screen function
      function getfullscreen(){

        // hide all cells
        [].forEach.call(document.querySelectorAll('.jp-Cell'), function (ec:HTMLElement) {
          ec.classList.add("fullScreenHide");
        });

   
        // only show the activated cell
        sender.activeCell.node.classList.remove("fullScreenHide");



        // make notebook window full screen
        [].forEach.call(document.querySelectorAll('.p-DockPanel'), function (notebook_window:HTMLElement) {
          notebook_window.classList.add("fullScreenWin");
          });
        [].forEach.call(document.querySelectorAll('.jp-NotebookPanel'), function (notebook_inner_window:HTMLElement) {
          notebook_inner_window.classList.add("fullScreenWin");
          });
        [].forEach.call(document.querySelectorAll('.jp-NotebookPanel-notebook'), function (notebook_inin_window:HTMLElement) {
          notebook_inin_window.classList.add("fullScreenWin");
          });
      

  

        // hide other elements
        document.getElementById("jp-top-panel").classList.add("fullScreenHide");
        [].forEach.call(document.querySelectorAll('.p-TabBar'), function (TabBar:HTMLElement) {
          TabBar.classList.add("fullScreenHide");
           });
        document.getElementById("jp-left-stack").classList.add("fullScreenHide");
        [].forEach.call(document.querySelectorAll('.jp-NotebookPanel-toolbar'), function (toolbar:HTMLElement) {
          toolbar.classList.add("fullScreenHide");
           });
        [].forEach.call(document.querySelectorAll('.p-DockPanel-tabBar'), function (DockPanel_tabBar:HTMLElement) {
          DockPanel_tabBar.classList.add("fullScreenHide");
          });

        // remove full screen buttons
        [].forEach.call(document.querySelectorAll('.fullScreenBtn, .fullScreenBtnOP'), function (fb:HTMLElement) {
          fb.remove();
        });

        // 3rd button
        let b3 = document.createElement('button');
        b3.className = "exitFullScreenBtn";
        b3.classList.add("ScreenBtn");
        b3.innerHTML = "<div>exit ful-screen mode</div>";
        sender.activeCell.node.insertBefore(b3, sender.activeCell.node.childNodes[0]);

        let btns3: HTMLCollection = document.getElementsByClassName("exitFullScreenBtn");
        for(let i = 0;i<btns3.length;i++){
          btns3.item(i).addEventListener("click", (e:Event) => exitFullScreen());
        }

       }

      function getfullscreenOP(){
      
      getfullscreen();
      

      // only show output (hide input)
      [].forEach.call(document.querySelectorAll('.jp-Cell-inputWrapper'), function (ip:HTMLElement) {
        ip.classList.add("fullScreenHide");
      });
      

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

        // make fullscreen buttons back
        sender.activeCell.node.insertBefore(b1, sender.activeCell.node.getElementsByClassName("jp-Cell-inputWrapper").item(0));
        sender.activeCell.node.insertBefore(b2, sender.activeCell.node.getElementsByClassName("jp-Cell-outputWrapper").item(0));
  
        } 




    });
  }
};

export default extension;
