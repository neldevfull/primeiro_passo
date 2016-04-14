$(function() {
    var url = location.pathname.split("/");
    url     = url[url.length - 1];

    switch (url) {
        case "index.html":
            $("#register").on("click", function(event) {
                event.preventDefault();

                window.location.href = "chat.html";

                localStorage.setItem("fullname", $("#fullname").val());
            });
            break;

        case "chat.html":
            var userName = localStorage.getItem("fullname");
            $("#userName").empty().append(userName);

            var initial = function() {
                var allQuestions = JSON.parse(localStorage.getItem("allQuestions"));

                var list = "";
                if(allQuestions) {
                    for (var i = 0; i < allQuestions.length; i++) {
                        var respond = i == 0 ? allQuestions[i].response :
                            allQuestions[i].respTwo;

                        list += "<li>"+allQuestions[i].userName+"</li>"+
                            "<li>"+allQuestions[i].questions+"</li>"+
                            "<li>"+allQuestions[i].consultant+"</li>"+
                            "<li>"+respond+"</li>";
                    }
                }

                $("#displayQuestions").empty().append(list);
            }

            initial();

            $("#sendChat").on("click", function() {
                var responseOne = "Olá "+userName+" nós estamos muito felizes em atendê-lo."+
                    "O MEI estará dispensado de emitir nota fiscal para consumidor pessoa"+
                    "física, porém, estará obrigado à emissão quando o destinatário da "+
                    "mercadoria ou serviço for outra empresa, salvo quando esse destinatário "+
                    "for o emissor da nota fiscal de entrada.";

                var responseTwo = userName+" tenha um bom dia e disponha do nosso serviço de "+
                    "atendimento online através do nosso chat";

                var allQuestions = [];
                var question = {
                    userName: userName,
                    consultant: "Laura C. Consultora",
                    questions: $("#question").val(),
                    response: responseOne,
                    respTwo: responseTwo
                };

                if(JSON.parse(localStorage.getItem("allQuestions")))
                    allQuestions = JSON.parse(localStorage.getItem("allQuestions"));

                var quest = '<li style="color:blue">'+question.userName+'<li>'
                    +question.questions+'</li></li>';
                var res   = "";

                if(allQuestions.length > 0)
                    res = "<li>"+question.consultant+"</li><li>"+question.respTwo+"</li>";
                else
                    res = "<li>"+question.consultant+"</li><li>"+question.response+"</li>";

                $("#question").val("");
                $("#displayQuestions").append(quest);

                setTimeout(function() {
                    $("#displayQuestions").append(res);
                }, 4000);

                allQuestions.push(question);
                localStorage.setItem("allQuestions", JSON.stringify(allQuestions));
            });

            $("#cleanHistorical").on("click", function() {
                localStorage.removeItem("allQuestions");
                $("#displayQuestions").empty().append("");
            });

            break;
        default:
            break;
    }
});