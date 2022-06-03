var db = null;

addEventListener("load", beginCreateDB);
function beginCreateDB() {
	db = openDatabase('mydb', '1.0', 'My first database', 2 * 1024 * 1024);
	db.transaction(consultaDB, errorCDB,exitCDB);
}

function consultaDB(tx) {
  //Crear la tabla contactos si no esta creada
  tx.executeSql('CREATE TABLE IF NOT EXISTS Contactos (id, nombre, email)');
	//Insertar datos en la tabla
	//tx.executeSql('INSERT INTO Contactos (id, nombre, email) VALUES (1, "Jose Cordova","jc@gmail.com")');
	//tx.executeSql('INSERT INTO Contactos (id, nombre, email) VALUES (2, "Maria Alpei","ma@gmail.com")');
	tx.executeSql('SELECT id, nombre, email FROM Contactos',[],(tx, results) => {
		var lista = [];
		for(var i =0; i < results.rows.length; i++){
			lista.push('<li>' + results.rows.item(i).nombre +', '+results.rows.item(i).email  + '</li>');
		}
		document.getElementById('resultados').innerHTML = lista.join('');
	});
}

// función para capturar el error en la transacción
function errorCDB(error) {
	alert("Error en la consulta SQL: "+error.code);
}

// Funcion para mostrar un mensaje de exito
function exitCDB() {
	alert("Consulta exitosa!");
}
