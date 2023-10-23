$(() => {
   function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
   }
   
   const name = getCookie("sessionUser");
   const photo =  getCookie("sessionPhoto");

   if(photo){
      document.querySelector(".photo").src = photo;
   }else {
      document.querySelector(".photo").src = 'https://images2.imgbox.com/ba/ea/nwtL5aAW_o.jpg';
   } 

   console.log(document.querySelector(".photo").src);

   document.querySelector("#username").textContent = name;
})

document.querySelector(".logout").addEventListener("click", () => {
  function clearCookies(){
      // Obtém todos os cookies atuais
      const cookies = document.cookie.split(";");

      // Itera sobre os cookies e os remove definindo uma data de expiração no passado
      cookies.forEach((cookie) => {
         const parts = cookie.split("=");
         const name = parts[0].trim();
         document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      });
  }

  clearCookies();

  if(document.cookie === ''){
   window.location.reload();
  }else{
   clearCookies();
  }
});