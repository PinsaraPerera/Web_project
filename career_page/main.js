let controller = new ScrollMagic.Controller();
let timeline = new TimelineMax();

timeline
  .to(".man", 10, { y: -300, x: 76 })
  .to(".girl", 10, { y: -200, x: -150 }, "-=10")
  .fromTo(".bg1", { bottom: "0%" }, { y: 0, duration: 10 }, "-=10")
  .to(".content", 10, { top: "0%" }, "-=10");
//   .fromTo(".content-images", { opacity: 0 }, { opacity: 1, duration: 3 })
//   .fromTo(".text", { opacity: 0 }, { opacity: 1, duration: 3 });

let scene = new ScrollMagic.Scene({
  triggerElement: "section",
  duration: "300%",
  triggerHook: 0,
})
  .setTween(timeline)
  .setPin("section")
  .addTo(controller);

const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");
tl.fromTo("nav", { opacity: 0 }, { opacity: 1, duration: 1 });
tl.fromTo(".main-title", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");
tl.fromTo(".man", { opacity: 0 }, { opacity: 1, duration: 1 });
tl.fromTo(".girl", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");

// window.addEventListener('scroll', () => {
//   const scrollable = document.documentElement.scrollHeight - window.innerHeight;
//   const scrolled = window.scrollY;

//   console.log(scrolled);
// })

const scrollable =
  document.documentElement.scrollHeight - window.innerHeight - 50;

document.querySelector("#myBtn").addEventListener("click", () => {
  window.scrollTo(0, scrollable);
});

// form validation

let forms = document.querySelectorAll(".needs-validation");

Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }else{
        get_data();
        setTimeout(function () {
          window.location = 'http://localhost/jobs.html';
        }, 11000); 
      }

      form.classList.add("was-validated");
    },
    false
  );
});


// get data from form and send it to the server side and get the response

function get_data() {

  let form_element = document.getElementsByClassName("form-data");
  let form_data = new FormData();

  for (let i = 0; i < form_element.length; i++) {
    form_data.append(form_element[i].name, form_element[i].value);
  }

  document.getElementById("submit").disabled = true;

  let ajax_req = new XMLHttpRequest();

  ajax_req.open("POST", "database.php");

  ajax_req.send(form_data);

  ajax_req.onreadystatechange = function () {
    if (ajax_req.readyState == 4 && ajax_req.status == 200) {
      document.getElementById("submit").disabled = false;
      let response = JSON.parse(ajax_req.responseText);

      if (response.success != "") {
        document.getElementById("detail_form").reset();
        // document.getElementById("alert-suc").innerHTML =
        //   '<script>success_fun();</script>';
        success_fun();

        function success_fun() {
          let message = document.getElementById("alert-suc");
          message.classList.add("show");
          message.classList.remove("d-none");

          // setTimeout(function () {
          //   message.classList.remove("show");
          //   message.classList.add("hide");
          // }, 5000);

          // setTimeout(function () {
          //   message.classList.add("d-none");
          // }, 10000);
        }
      } else {
        // Displaying the error alert(duplicate primary key)

        document.getElementById("detail_form").reset();
        warning_fun();

        // document.getElementById("alert-war").innerHTML =
        //   '<script>warning_fun();</script>';

        function warning_fun() {
          let message_1 = document.getElementById("alert-war");
          message_1.classList.add("show");
          message_1.classList.remove("d-none");

          // setTimeout(function () {
          //   message_1.classList.remove("show");
          //   message_1.classList.add("hide");
          // }, 5000);

          // setTimeout(function () {
          //   message_1.classList.add("d-none");
          // }, 5000);
        }
      }
    // } else {
    //   // Displaying the error msg of connection error or server down

    //   // document.getElementById("alert-dan").innerHTML =
    //   //   '<script>danger_fun();</script>';

    //   console.log("Error!!!");

    //   danger_fun();

    //   function danger_fun() {
    //     let message_2 = document.getElementById("alert-dan");
    //     message_2.classList.add("d-flex");
    //     message_2.classList.remove("d-none");

    //     setTimeout(function () {
    //       message_2.classList.add("d-none");
    //     }, 5000);
    //   }
    }
  };
}
