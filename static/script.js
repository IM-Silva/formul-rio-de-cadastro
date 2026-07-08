async function cadastrarPet() {

    const msg = document.getElementById("msg");

    const dados = {
        matricula: document.getElementById("matricula").value,
        nome: document.getElementById("nome").value,
        cor: document.getElementById("cor").value,
        peso: document.getElementById("peso").value,
        tamanho: document.getElementById("tamanho").value
    };

    try {
        const response = await fetch("http://127.0.0.1:5000/cadastro-pet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const result = await response.json();

        if (response.ok) {
            msg.innerHTML = "✔ Pet cadastrado com sucesso!";
            msg.className = "msg success";

            // limpa formulário
            document.getElementById("matricula").value = "";
            document.getElementById("nome").value = "";
            document.getElementById("cor").value = "";
            document.getElementById("peso").value = "";
            document.getElementById("tamanho").value = "";
        } else {
            msg.innerHTML = "❌ Erro ao cadastrar";
            msg.className = "msg error";
        }

    } catch (error) {
        msg.innerHTML = "❌ Erro de conexão com a API";
        msg.className = "msg error";
    }
}