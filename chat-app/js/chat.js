const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

const getMessages = async userID => {
    let query = await db.collection("users").get();
    let ret = false;
    query.forEach((doc) => {
        let data = doc.data();
        if (data.userid == userID) {
            updateCurrentInfo(data.name);
            ret = JSON.parse(data.messages);
        }
    });
    return ret;
}

const displaySelected = async userID => {
    if (userID) {
        // get the conversation
        let messages = await getMessages(userID);
        if (messages) {
            // display them
            let main = document.querySelector('#content')
            main.innerHTML = '';
            for (let message of messages) {
                let p = document.createElement('p');
                p.classList.add(message['float']);
                p.innerHTML = message['text'];

                main.appendChild(p);
            }
        }
    }
}

const updateCurrentInfo = userName => {
    let ci = document.querySelector('#current-info');
    ci.innerHTML = `> ${userName}`;
}

// Get from localStorage
let selected = localStorage.getItem('chat-app:selected');
displaySelected(selected);

// Get friends 😉
db.collection("users").get().then(query=>{
    let aside = document.querySelector('aside .simplebar-content');
    query.forEach(doc => {
        let data = doc.data();
        if (data.friend) {

            let a = document.createElement('a');
            a.classList.add('account');
            a.setAttribute('href', '#');
            a.setAttribute('data-userid', data.userid);
            if (selected == data.userid) {
                a.classList.add('active');
            }
            
            let figure = document.createElement('figure');
            
            let img = document.createElement('img');
            img.src = data.img;

            let figcaption = document.createElement('figcaption');
            figcaption.innerHTML = data.name;

            figure.appendChild(img);
            figure.appendChild(figcaption);
            a.appendChild(figure);

            aside.appendChild(a);

            a.addEventListener('click', e=>{
                e.preventDefault();
                let other = document.querySelector('.account.active');
                if (other) {
                    other.classList.remove('active');
                }
                localStorage.setItem('chat-app:selected', a.attributes["data-userID"].value);
                selected = localStorage.getItem('chat-app:selected');
                a.classList.add('active');
                displaySelected(selected);
            });

        } else {

            let ul = document.querySelector('#add-modal ul');

            let li = document.createElement('li');

            let figure = document.createElement('figure');
            
            let img = document.createElement('img');
            img.src = data.img;

            let figcaption = document.createElement('figcaption');
            figcaption.innerHTML = data.name;

            figure.appendChild(img);
            figure.appendChild(figcaption);
            li.appendChild(figure);

            ul.appendChild(li);

        }
    });
})

// Update #current-info
db.collection('users').get().then(query=>{
    query.forEach(doc => {
        let data = doc.data();
        if (data.userid == selected) {
            updateCurrentInfo(data.name);
        }
    })
})