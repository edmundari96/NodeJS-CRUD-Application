// this alerts data inserted successfully when the user is added or inserted into the database
$("#add_user").submit(function(event){
    alert('Data inserted successfully');
});

// this jquery function is called when the form to send the updated user profile is submitted// its job is to bundle all the updated user details into an array
$("#update_user").submit(function (event) {
    event.preventDefault();
    let unindexed_array  =  $(this).serializeArray();
    
    let data = {};
    // the user data in the serialized array {unindexed_array} is now looped through and and stored in an object {data} created above
    $.map(unindexed_array, function( n, i ){
        data[n['name']] = n['value'];
    })
    // console.log(unindexed_array);

    // this is an ajax jquery request to put the updated user details in the data object into the database// this request is passed through route.js to run the delete request
    let request = {
      "url": `http://localhost:3000/api/myFirstDatabase/${data.id}`,
      "method": "PUT",
      "data" : data 
    }
    $.ajax(request).done(function(response){
        alert("Data updated successfully");
    })
}); 

if(window.location.pathname == '/'){
    $ondelete = $(" .table tbody td a .delete ");
    $ondelete.click(function(){
        let id = $(this).attr("data-id")

        let request = {
          url: `http://localhost:3000/api/myFirstDatabase/${data.id}`,
          method: "DELETE"
        }
        if(confirm("do you want to delete this record")){
                $.ajax(request).done(function (response) {
                  alert("Data deleted successfully");
                  location.reload;
                })
        }
    })
}