//Idioma
jsonTranslations = JSON.parse(traducciones);

//Nodo
verifNode_Success = localStorage.getItem('verifnode');
console.log("Ésto es el chequeo desde Success:...");
console.log(verifNode_Success);

function checkNode(tzid_recibido, nodo_recibido){

    console.log("Estamos dentro de la función...");
    console.log("Y ésto es el tzid recibido por la función...");
    console.log(tzid_recibido);

    console.log("Y ésto es el nodo recibido por la función...");
    console.log(nodo_recibido);

    //Por otra parte, requerimos saber cual es el nodo que está guardado en el storagelocal. 
        nodoOficial = localStorage.getItem('verifnode');
        console.log("Éste es el nodo guardado de forma local:...")
        console.log(nodoOficial);

    //Si ambos son iguales, continua....

    if(nodo_recibido == nodoOficial){
        console.log("Ambos son iguales!");
        obtenMensajeFinal();
    }
    else{
        console.log("Son DIFERENTES!!!");
    }

}

function obtenMensajeFinal(){
    //No se va a hacer el fetch si no coincide el código verificador, para evitar llamados innecesarios.
    url = 'http://onlinesim.ru/api/getState.php?apikey=' + varmain + '&message_to_code=0&tzid=' + tzidparam + '&msg_list=0'
    console.log("Ésta es la url...")
    console.log(url);


    fetch(url)
      .then(response => response.json())
      .then(data => {
          if(data[0].response == 'TZ_NUM_WAIT'){
                //Aquí llega si sí existe pero aún está esperando...
                console.log("Seguimos en espera de que envíes un mensaje..");

            }
            else{
                //Aquí llega si ya le llegó el mensaje.
                console.log("Esto es data[0].response;");
                console.log(data[0].response);
                mensaje = data[0].msg;
                //Task: Aquí solo checa si los datos más recientes quedan en el 0 o en el último.
                //Resuelto: Cero es el más reciente...
            
                fillCard(data);

                //Si se bypasseo (la compra no) la lectura del mensaje(bypass_leer),...
                //entonces: agrega un mensaje genérico.
   
                if(bypass_leer==true){
                    mensaje = "[53904836] This is your new code: 540904836."
                } 

                //Esto también se debería hacer con promesas...
                escribeResultadosSuccessPayment('glass2_textrows', mensaje); 
        
            }

        }
 
          )
      .catch(err => {
        console.error(err);
        console.log("Estamos en el catch de la obtención del mensaje final.");
        //Redireccionaba asumiendo que se llega aquí cuando se ponen direcciones incorrectas pero hay más razones.
        //location.replace("http://127.0.0.1:5501/");
      });

}

function fillCard(objeto){
    console.log("Estamos dentro de la función FILLCARD."); 
    console.log("Ésto es el objeto de datos del response...");
    console.log(objeto); 
    
    //Obten las variables...
    country = objeto[0].country;
    service = objeto[0].service;

    //Pequeña corrección por un problema externo que viene de la API. 
    //En donde el servicio no es Fcebook pero dejaron el número. 

    if(service == 3223){
        service = "Facebook";
    }


    number = objeto[0].number;
    
    // get cardText1
    let cardText1 = document.getElementById('cardText1');
    let cardText2 = document.getElementById('cardText2');
    let cardText3 = document.getElementById('cardText3');

    //Fill
    
    //Ésto no se usará más, pero getInfoCountry puede servir para mucha otras cosas...
    //cardText1.innerHTML = getInfoCountry(country, service);
    cardText2.innerHTML = capitalize(service);
    cardText3.innerHTML = number;

    PaisCard = localStorage.getItem('pais');
    console.log("Éste es el país en el País Card...");
    console.log(PaisCard);
    cardText1.innerHTML = PaisCard;
}
  





  

      


