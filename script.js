const insertBtn = document.getElementById("ins");
     insertBtn.addEventListener("click",insert);

     function insert()
     {
         document.getElementById("content").style.display = "none";
         document.getElementById("container").style.display = "block";
     }
         const addBtn = document.getElementById("add");
         let form = document.getElementById("form");
 

         addBtn.addEventListener("click",adder);

         function adder()
         {
             console.log(`${form.elements[0].value}, "${form.elements[1].value}",${form.elements[2].value}`);
             db.transaction(function(tx){
                 tx.executeSql(`INSERT INTO inventory  VALUES (${form.elements[0].value}, "${form.elements[1].value}",${form.elements[2].value})`);
             });
         }

        const delBtn = document.getElementById("del");
        delBtn.addEventListener("click",del);
        function del()
        {
            let cmd = 'DROP TABLE inventory';
            db.transaction(function(tx){
                tx.executeSql(cmd);
            });
            document.querySelector('#status').innerHTML = "NO DATA";
        }

        var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024); 
        var msg; 
        
        const create = document.getElementById("create");
        create.addEventListener("click",creator);
        function creator()
        {
            db.transaction(function (tx) { 
           tx.executeSql('CREATE TABLE IF NOT EXISTS inventory (id integer primary key, name varchar(15),qty integer)'); 
           msg = '<p>Table Created.</p>'; 
           document.querySelector('#status').innerHTML =  msg; 
        });

        }

       

        const btn = document.getElementById("btn");
        console.log(btn);
        btn.addEventListener("click",viewer);
        function viewer()
        {   msg = "";
            document.querySelector('#status').innerHTML = "";
           document.getElementById("content").style.display = "block";
           document.getElementById("container").style.display = "none";
           db.transaction(function (tx) { 
           tx.executeSql('SELECT * FROM inventory', [], function (tx, results) { 
              var len = results.rows.length, i; 
              msg = "<p>Found rows: " + len + "</p><br>" + "<table>" + "<th>ID</th><th>Name</th><th>Quantity</th>"; 
              
     
              for (i = 0; i < len; i++) { 
                 msg += "<tr><td>" + results.rows.item(i).id + "</td>"+"<td>" + results.rows.item(i).name + "</td>" + "<td>" + results.rows.item(i).qty + "</td></tr>"; 
                 
              } 
              msg += "</table>";
              document.querySelector('#status').innerHTML +=  msg; 
           }, null); 
        }); 
        }


        const searchBtn = document.getElementById("search");
        const searchForm = document.getElementById("search-form");
        searchBtn.addEventListener("click",search);
        function search()
        {
            let query = `SELECT * FROM inventory WHERE ${searchForm.elements[0].value} = "${searchForm.elements[1].value}"`;
            console.log(query);
            db.transaction(function (tx) { 
                tx.executeSql(query, [], function (tx, results) { 
                   var len = results.rows.length, i; 
                   msg = "";
                   document.querySelector('#status').innerHTML = "";
                   msg = "<p>Found rows: " + len + "</p><br>" + "<table>" + "<th>ID</th><th>Name</th><th>Quantity</th>"; 
                   
          
                   for (i = 0; i < len; i++) { 
                      msg += "<tr><td>" + results.rows.item(i).id + "</td>"+"<td>" + results.rows.item(i).name + "</td>" + "<td>" + results.rows.item(i).qty + "</td></tr>"; 
                      
                   } 
                   msg += "</table>";
                   document.querySelector('#status').innerHTML +=  msg; 
                }, null); 
             }); 
        }



        const updateBtn = document.getElementById("update");
        const updateForm = document.getElementById("update-form");
        updateBtn.addEventListener("click",update);
        function update()
        {
            let query = `UPDATE inventory SET ${updateForm.elements[0].value} = "${updateForm.elements[3].value}" WHERE ${updateForm.elements[0].value} = "${updateForm.elements[2].value}" AND id="${updateForm.elements[1].value}"`;
            console.log(query);
            db.transaction(function (tx) { 
                tx.executeSql(query);
        });
        viewer();
  }

  const deleteBtn = document.getElementById("delete");
  const deleteForm = document.getElementById("delete-form");
  deleteBtn.addEventListener("click",deleter);

  function deleter()
  {
      let query = `DELETE FROM inventory WHERE ${deleteForm.elements[0].value} = "${deleteForm.elements[1].value}" `;
      console.log(query);
            db.transaction(function (tx) { 
                tx.executeSql(query);
        });
        viewer();
  }