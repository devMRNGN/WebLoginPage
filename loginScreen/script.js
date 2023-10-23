//////////////////////////////////////////// JAVASCRIPT LOGIN //////////////////////////////////////////////////////

const buttonVerSenha = document.querySelector("#ver-senha-login");
buttonVerSenha.addEventListener("click", () => {
   const alterarImagem = document.querySelector("#ver-senha-login");
   const inputPassword = document.querySelector("#password-login");
   if(inputPassword.type === "password"){
      inputPassword.setAttribute("type", "text");
      alterarImagem.setAttribute("src", "https://img.icons8.com/ios/50/visible--v1.png");
   }else{
      inputPassword.setAttribute("type", "password");
      alterarImagem.setAttribute("src", "https://img.icons8.com/ios/50/blind.png");
   }
});

// Evento para receber os dados dos inputs e realizar login
const buttonEntrar = document.querySelector(".button.entrar");
buttonEntrar.addEventListener("click", async () => {
   const userEmail = document.querySelector("#email-login").value;
   const userPassword = document.querySelector("#password-login").value;

   const data = {
      email: userEmail,
      password: userPassword
   }

   const { accessToken, user, login, photo } = await sendUserData(data, "login", "POST");

   console.log(`Permissão para logar: ${login ? "Usuário Logado" : "Senha incorreta"}`);
   console.log(`JSONWEBTOKEN: ${accessToken}`);

   if(login){
      setCookie("sessionToken", accessToken);
      setCookie("sessionUser", user);
      if(photo) setCookie("sessionPhoto", photo);

      window.location.href = "../loggedScreen/telaLogado.html";
   }
});

//cookies
function setCookie(name, value) {
   var now = new Date();
   now.setTime(now.getTime() + 1 * 3600 * 1000);
   document.cookie = name + '=' + value + '; expires=' + now.toUTCString() + '; path=/';
}

// Evento para realizar cadastro


//////////////////////////////////////////// JAVASCRIPT CADASTRO //////////////////////////////////////////////////////

const sairTelaCadastro = document.querySelector(".button-modal-exit");
sairTelaCadastro.addEventListener("click", () => {
   const modal = document.querySelector(".container-cadastro");
   modal.style.display = "none";
});

const buttonVerSenhaCadastro = document.querySelector("#ver-senha-cadastro");
buttonVerSenhaCadastro.addEventListener("click", () => {
   const eyeImage = document.querySelector("#ver-senha-cadastro");
   const inputPassword = document.querySelector("#senha-cadastro");
   if(inputPassword.type === "password"){
      inputPassword.setAttribute("type", "text");
      eyeImage.setAttribute("src", "https://img.icons8.com/ios/50/visible--v1.png");
   }else{
      inputPassword.setAttribute("type", "password");
      eyeImage.setAttribute("src", "https://img.icons8.com/ios/50/blind.png");
   }
})

const buttonCadastrar = document.querySelector(".button.cadastrar");
buttonCadastrar.addEventListener("click", () => {
   const modal = document.querySelector(".container-cadastro");
   modal.style.display = "block";
});

const formulario = document.getElementById("form-cadastro");
formulario.addEventListener("submit", async e => {
   e.preventDefault();

   const nome = document.querySelector('input[name="Nome"]').value;
   const sobrenome = document.querySelector('input[name="Sobrenome"]').value;
   const username = document.querySelector('input[name="Username"]').value;
   const email = document.querySelector('input[id="email-cadastro"]').value;
   const senha = document.querySelector('input[id="senha-cadastro"]').value;
   const curso = document.querySelector('input[name="Curso"]').value;
   const image = document.querySelector('input[name="Link Imagem"]').value;

   const data = {
      email,
      password: senha,
      username,
      curso,
      name: `${nome} ${sobrenome}`,
      photo: image || null
   }

   const retorno = await sendUserData(data, "cadastrar", "POST");

   console.log(`Sucess: ${retorno.success}`);
   console.log(`Response: ${retorno.response}`);
});

async function sendUserData(data, route, method){
   const mensagem = {
      response: null,
      success: null,
      erro: null,
      login: null,
      accessToken: null,
      user: null,
      photo: null
   };

   try {
      const response = await fetch(`https://server-r9lv5cty5-devmrngn.vercel.app/${route}`, {
         method: method,
         mode: "cors",
         referrerPolicy: "no-referrer",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if(responseData.erro){
         mensagem["erro"] = responseData.erro;
         return mensagem;
      }

      switch(route){
         case "login":
            mensagem["login"] = responseData.login;
            mensagem["accessToken"] = responseData.accessToken;
            mensagem["user"] = responseData.user;
            mensagem["photo"] = responseData.photo;
         break;
         case "cadastrar":
            mensagem['response'] = responseData.response;
            mensagem['success'] = responseData.success;
         break;
      }

   } catch(e) {
      console.error("Error:", e);
   } finally {
      return mensagem;
   }
}