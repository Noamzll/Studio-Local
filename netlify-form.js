document.addEventListener('DOMContentLoaded',()=>{
  const form=document.querySelector('#contactForm');
  if(!form)return;
  const note=document.querySelector('#formNote');
  const button=form.querySelector('button[type="submit"]');

  form.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!form.checkValidity()){
      form.reportValidity();
      return;
    }

    const originalText=button.textContent;
    button.disabled=true;
    button.textContent='Envoi en cours…';
    note.textContent='Envoi de votre demande…';

    try{
      const body=new URLSearchParams(new FormData(form));
      const response=await fetch('/',{
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:body.toString()
      });

      if(!response.ok)throw new Error(`HTTP ${response.status}`);

      form.reset();
      note.textContent='Merci. Votre demande a bien été envoyée. Je vous répondrai directement par e-mail.';
      button.textContent='Demande envoyée';
      setTimeout(()=>{button.textContent=originalText;button.disabled=false},2500);
    }catch(error){
      console.error('Erreur formulaire Netlify',error);
      note.textContent='L’envoi a échoué. Vous pouvez me contacter directement à noamlagedamont@gmail.com.';
      button.textContent=originalText;
      button.disabled=false;
    }
  },true);
});
