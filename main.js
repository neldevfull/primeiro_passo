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
            $("#userName").empty().append(localStorage.getItem("fullname"));

            var allQuestions = JSON.parse(localStorage.getItem("allQuestions"));

            var list = "";
            if(allQuestions) {
                allQuestions.reverse().forEach( function(element, index) {
                    list += "<li>"+element.questions+"</li>"+
                        "<li>"+element.response+"</li>";
                });
            }

            $("#displayQuestions").empty().append(list);

            $("#sendChat").on("click", function() {
                var allQuestions = [];
                var question = {
                    questions: $("#question").val(),
                    response: "Ola, nós estamos muito felizes"
                };

                if(JSON.parse(localStorage.getItem("allQuestions")))
                    allQuestions = JSON.parse(localStorage.getItem("allQuestions"));

                allQuestions.push(question);

                var list = "";
                allQuestions.reverse().forEach( function(element, index) {
                    list += "<li>"+element.questions+"</li>"+
                        "<li>"+element.response+"</li>";
                });

                $("#displayQuestions").empty().append(list);
                $("#question").val("");

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