
document.addEventListener('DOMContentLoaded', ()=>{
    var btn = document.getElementById('send-whatsapp')
    var btnSendCalendar = document.getElementById('send-calendar')
    btn.addEventListener('click',()=>{
        try {
            var name = document.getElementsByName('name-form')[0].value.replace(/ /g, "%20")
            var type = document.getElementsByName('type-form')[0].value
            var desc = document.getElementsByName('desc-form')[0].value.replace(/ /g, "%20")

            if (type == 1){
                alert('Favor de elejir un tipo de consulta')
            } else{
                var url=`https://api.whatsapp.com/send?phone=526251069742&text=Asistencia.%20Nombre:%20${name}.%20Motivo:%20${type}.%20Descripción:%20${desc}.`
                window.open(url, '_blank');
                document.getElementsByName('name-form')[0].value = ''
                document.getElementsByName('type-form')[0].value = '1'
                document.getElementsByName('desc-form')[0].value = ''
                document.querySelector('.close-animatedModal').click()
            }

        } catch (error) {
            alert('Complete todos los campos')
        }
    })

    btnSendCalendar.addEventListener('click',()=>{
        try {
            var name = document.getElementsByName('name-form-calendar')[0].value.replace(/ /g, "%20")
            var day = document.getElementsByName('date-form-calendar')[0].value
            var hour = document.getElementsByName('time-form-calendar')[0].value
            var type = document.getElementsByName('type-form-calendar')[0].value

            if (type == 1){
                alert('Favor de elejir un tipo de consulta')
            }
            else{
                var url=`https://api.whatsapp.com/send?phone=526251069742&text=Agenda%20tu%20cita.%20nombre:%20${name}.%20Día:%20${day}.%20Hora:${hour}.%20motivo:%20${type}.`
                window.open(url, '_blank');
                var name = document.getElementsByName('name-form-calendar')[0].value = ''
                var day = document.getElementsByName('date-form-calendar')[0].value = ''
                var hour = document.getElementsByName('time-form-calendar')[0].value = ''
                var type = document.getElementsByName('type-form-calendar')[0].value = ''
            }
        } catch (error) {
            alert('Complete todos los campos')
        }
    })
})





function setXMLData(){
    var parser = new DOMParser();
    var doc = parser.parseFromString(stringContainingXMLSource, "application/xml");
}