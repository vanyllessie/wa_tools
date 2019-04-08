(function(){
  let aviso = false;
  let panSide = document.getElementById("pane-side");
  let container = panSide.children[0];
  let appendListendIcon = function(elemDOM){
      var listenIconDOM = document.createElement("div");
      listenIconDOM.style.backgroundColor = "white";
      listenIconDOM.style.position = "absolute";
      listenIconDOM.style.width = "125px";
      listenIconDOM.style.height = "14px";
      listenIconDOM.style.right = "15px";
      listenIconDOM.style.top = "40px";
      listenIconDOM.style.fontSize = "11px";
      listenIconDOM.innerText = "Automated Notification";
      elemDOM.appendChild(listenIconDOM);
  }
  let getUsersWithStatus = function(users){
      var usersWithStatus = [];
      for(let item of users){
          if(item.firstChild.firstChild.classList.length>1){
              usersWithStatus.push(item.firstChild.firstChild);
          }
      }
      return usersWithStatus;
  }
  let getActiveUser = function(){
      var users = getUsers();
      var usersWithStatus = getUsersWithStatus(users);
      var activeUser;
      for (var i = 1; i < usersWithStatus.length; i++) {
        if (!activeUser && usersWithStatus[i].classList[usersWithStatus[i].classList.length-1] != usersWithStatus[i - 1].classList[usersWithStatus[i - 1].classList.length-1]) {
            if( i == 1){
                if (usersWithStatus[i].classList[usersWithStatus[i].classList.length-1] != usersWithStatus[i + 1].classList[usersWithStatus[i + 1].classList.length-1]){
                    activeUser = usersWithStatus[i];
                }
                else{
                    activeUser = usersWithStatus[0];
                }
            }
            else{
                activeUser = usersWithStatus[i];
            }
        }
      }
      return activeUser;
  }
  let getUsers = function(){
      var conversationTiles = [];
      while (container.classList.length == 0){
        container  = container.children[0]
      }
      conversationTiles = container.children;
      return conversationTiles;
  }
  let init = function(){
      var activeUser = getActiveUser();
      if (activeUser) {
        appendListendIcon(activeUser);
      setInterval(function() {
        if (document.querySelector("span[title='en línea']")) {
          if (!aviso) {
            console.log("USUARIO EN LINEA!!");
            aviso = true;
          }
        } else {
          aviso = false;
          console.log("NO ESCRIBIENDO...");
        }
      }, 1000);
      }
      else{
          let errorDOM = document.createElement("div");
          errorDOM.style.backgroundColor = "#ff5959";
          errorDOM.style.textAlign = "center";
          errorDOM.style.position = "absolute";
          errorDOM.style.width = "50%";
          errorDOM.style.height = "54px";
          errorDOM.style.right = "25%";
          errorDOM.style.top = "50%";
          errorDOM.style.color = "white";
          errorDOM.style.zIndex = "99999";
          errorDOM.style.fontSize = "23px";
          errorDOM.innerText = "There is no active conversation. Select one contact to shedule notification";
          document.body.appendChild(errorDOM);
          setTimeout(function(){
              errorDOM.remove()
          },2000)
      }
  }
  init();
  // getActiveUser();
})()
