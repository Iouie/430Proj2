const HandleDomo = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'}, 350);

    if($("#domoName").val() === '' || $("#domoAge").val() === ''){
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
        loadDomosFromServer();
    });

    return false;
};

const deleteDomo = (e) => {
    e.preventDefault();

  $('#domoMessage').animate({ width: 'hide' }, 350);

  if ($('#delDomoName').val() === '') {
    handleError('RAWR! Name is empty');
    return false;
  }

  sendAjax('POST', $('#delDomoForm').attr('action'), $('#delDomoForm').serialize(), function() {
      loadDomosFromServer();
  });
}


const DomoForm = (props) => {
    return(
        <form id="domoForm"
        name="domoForm"
        onSubmit={HandleDomo}
        action="/maker"
        method='POST'
        className="domoForm"
        >
        <label htmlFor="name">Username: </label>
        <input id="domoName" type="text" name="name" placeholder="Domo Name" />
        <label htmlFor="age">Age: </label>
        <input id="domoAge" type="text" name="age" placeholder="Domo Age" />
        <label htmlFor="level">Level:</label>
        <input id="domoLevel" type="text" name="level" placeholder="Domo Level" />
        <input type="hidden" name="_csrf" value={props.csrf}/>
        <input className="makeDomoSubmit" type="submit" value="Make Domo" />

        </form>
    );
};

const DeleteDomoForm = (props) => {
    return (
        <div>
            <h1>Delete Domos With Name Name:</h1>
            <form id="delDomoForm"
                name="delDomoForm"
                onSubmit={deleteDomo}
                action='/deleteDomo'
                method='POST'
                className='delDomoForm'>
                <label htmlFor="name">Name:</label>
                <input id="delDomoName" type="text" name="name" placeholder="Domo Name" />
                <input type="hidden" name="_csrf" value={props.csrf} />
                <input className="makeDomoSubmit" type="submit" value="Delete Domo" />
            </form>
        </div>
    );
}

const DomoList = function(props) {
    if(props.domos.length === 0){
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos yet</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(function(domo) {
        return(
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName">Name: {domo.name} </h3>
                <h3 className="domoAge">Age: {domo.age} </h3>
                <h3 className="domoLevel"> Level: {domo.level} </h3>
            </div>
        );
    });

    return(
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const loadDomosFromServer = () => {
    sendAjax('GET', '/getDomos', null, (data) => {
        ReactDOM.render(
            <DomoList domos={data.domos} />, document.querySelector("#domos")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
    );

    ReactDOM.render(
        <DomoList domos={[]} />, document.querySelector("#domos")
    );

    ReactDOM.render(
        <DeleteDomoForm csrf={csrf} />, document.querySelector("#deleteDomo")
    );

    loadDomosFromServer;
}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});