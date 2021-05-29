let profile_image = document.querySelector(".profile_image");
let userName = document.querySelector(".username p");
let idName = document.querySelector(".username h2")
let profile = document.querySelector(".profile_description p")
let followers_ = document.querySelector(".followers_ span");
let follow_ = document.querySelector(".follow_ span");
let repo_details = document.querySelector(".repo_details");
// let profile_image = document.querySelector(".profile_image");


let username = '';

function inputFunction() {
    let input_user = document.querySelector(".input_user").value.trim();

    if (input_user.length <= 0) {
        alert("enter a valid gihub user name");
        document.querySelector(".input_user").Value = "";
        document.querySelector(".input_user").focus();
        return false;
    } else{
        username = input_user.split("").join("");
        //if everything is ok fetch user
        fetchUser();//function not yet made

        //clear the input and focus it for the next
        document.querySelector(".input_user").Value = "";
        document.querySelector(".input_user").focus();
    }
};

// add an eventlistener to the input button so when you hit enter it submits
document.querySelector(".input_user").addEventListener("keyup", function (e) {
    if(e.keyCode === 13) {
        // alert("tou have pressed enter")
        inputFunction()
    }
})

// fetch user fromgithub api
function fetchUser() {
    fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(function (data) {
        if (data.message === "Not Found") {
            alert("user not found");
            return false;
        }else{
            profile_image.innerHTML = `<img src="${data.avatar_url}">`;
            userName.innerHTML = data.login;
            profile.innerHTML = data.bio;
            idName.innerHTML = data.name;
            followers_.innerHTML = data.followers;
            follow_.innerHTML = data.following;
        }
    })

    // fetch repository fromgithub api
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(function (repo_data){
      console.log(repo_data);
      //if user exists but has no repo
      if (repo_data.lenght <= 0) {
          repo_details.innerHTML = `
          
          <div class="item_">
          <div class="repo_name"><p>No Repo Found</p></div>
          </div>
          `
      }else{
        // if both userand repositories are not found
        if(repo_data.message === "Not Found"){
            repo_details.innerHTML=`
        
            <div class="item_">
                            <div class="repo_name"><p>Todo App</p> <div class="star-icon">
                            <i class="far fa-star">Star</i></div>
                            </div>
                            <div class="repo_details_">
                                <div class="info_ star">
                                    <p><i class="far fa-star"></i>10</p>
                                </div>
                                <div class="info_ fork">
                                    <p><i class="fas fa-code-branch"></i>30</p>
                                </div>
                            </div>
                        </div>
                        `
                        profile_image.innerHTML = `<img src="profile-sample.jpg">`;
                        userName.innerHTML = "jahsays";
                        followers_.innerHTML = "4";
                        follow_.innerHTML = "40";
                    }else{
                        let repo_Data = repo_data.map(item =>{
                            console.log(item);
                            return(
                                `
                        <div class="item_">
                            <div class="repo_name"><p>${item.name}</p><div class="star-icon">
                            <i class="far fa-star">Star</i></div>
                            </div>
                            <div class="repo_details_">
                                <div class="info_ star">
                                    <p><i class="far fa-star"></i>${item.watchers}</p>
                                </div>
                                <div class="info_ fork">
                                    <p><i class="fas fa-code-branch"></i>${item.forks}</p>
                                </div>
                            </div>
                            <hr class="hr_two">
                        </div>
                                `
                            );
                        })
                        // maximum of 20 repos
                        repo_details.innerHTML = repo_Data.slice(0, 20); 
        }

      }
      
    });
}
