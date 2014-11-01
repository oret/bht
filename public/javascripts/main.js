$(document).ready(function(){
				// sound init
				var userAgent = window.navigator.userAgent.toLowerCase();
				if(userAgent.indexOf('firefox') != -1 || userAgent.indexOf('opera') != -1){
					/* Firefox and Opera */
					var src1 = "./se/drop1.ogg";
					var src2 = "./se/drop2.ogg";
					var src3 = "./se/drop3.ogg";
					var src4 = "./se/drop4.ogg";
					var src5 = "./se/drop5.ogg";
					var src_submit = "./se/submit.ogg";
				}else{
					var src1 = "./se/drop1.mp3";
					var src2 = "./se/drop2.mp3";
					var src3 = "./se/drop3.mp3";
					var src4 = "./se/drop4.mp3";
					var src5 = "./se/drop5.mp3";
					var src_submit = "./se/submit.mp3";
				}
				if (userAgent.indexOf('safari') != -1 && userAgent.indexOf('chrome') == -1) {
					//Safari
					var submitAudioDelay = 450;
				}else{
					var submitAudioDelay = 50;
				}
				var audioObjects = [new Audio(src1),new Audio(src2),new Audio(src3),new Audio(src4),new Audio(src5)];
				var audioPlaying = [0,0,0,0,0];
				audioObjects[0].load();
				audioObjects[1].load();
				audioObjects[2].load();
				audioObjects[3].load();
				audioObjects[4].load();
				audioObjects[0].addEventListener('ended', function(){audioPlaying[0] = 0;});
				audioObjects[1].addEventListener('ended', function(){audioPlaying[1] = 0;});
				audioObjects[2].addEventListener('ended', function(){audioPlaying[2] = 0;});
				audioObjects[3].addEventListener('ended', function(){audioPlaying[3] = 0;});
				audioObjects[4].addEventListener('ended', function(){audioPlaying[4] = 0;});

				var submitAudio = new Audio(src_submit);
				submitAudio.load();

				// submit functions
				$("#mail-form-button").on("click",function(){
					var mail = $("#mail-input").val();
					if(!mail || mail == ""){
						alert("メールアドレスが入力されていません。");
						return;
					}
					$("#result-mask").show();
					setTimeout(function(){
						$("#result").animate({height: "540px"}, 500, "swing");
					}, submitAudioDelay);
					submitAudio.play();
					$.ajax({
						type: "POST",
						url: "/API/saveMail.php",
						data: { mail: mail },
						dataType: "json"
					}).done(function(res) {
						if(res.code != 0){
							console.log(res);
							$("#result-mask").hide();
							$("#result").animate({height: "0"}, 300, "swing");
							alert("エラーが発生しました。お手数ですが通信環境を確認の後、再度お試し下さい。")
						}
					});
				});
				$("#result-mask, #result-close").on("click",function(){
					$("#result-mask").hide();
					$("#result").animate({height: "0"}, 300, "swing");
				});

				// input functions
				var changeRotate = function(beanObj, rotate){
					beanObj.css({ WebkitTransform: 'rotate('+parseInt(rotate)+'deg)' });
					beanObj.css({ MozTransform: 'rotate('+parseInt(rotate)+'deg)' });
					beanObj.css({ OTransform: 'rotate('+parseInt(rotate)+'deg)' });
					beanObj.css({ msTransform: 'rotate('+parseInt(rotate)+'deg)' });
				}

				var makeNewBean = function(){
					var newBean;
					var rand = (Math.random()-0.5);
					var rotateSpeed = parseInt(rand/Math.abs(rand));	// 1 or -1
					var rotate = parseInt(Math.random()*360);
					var left = parseInt((Math.random()-0.5)*70);

					newBean = $("#beans-template > div").clone();
					newBean.addClass("beans");
					// debug -------------
					// var vx = parseInt((Math.random()-0.5)*30);
					// var vy = parseInt(Math.random()*30)*(-1);
					// newBean.data("vx",vx);
					// newBean.data("vy",vy);
					// rotateSpeed *= 50;
					// -------------------
					newBean.data("rotateSpeed",rotateSpeed);
					newBean.data("rotate",rotate);
					changeRotate(newBean, rotate);

					newBean.children("img").attr("src", "./images/bean_"+(parseInt(Math.random()*5)+1)+".png");

					$("#mail-form").append(newBean);
					newBean.css("left", "+="+left+"px");
					newBean.animate({top: "+=20px"}, 300, "swing");
				}
				$("#mail-input").on("keypress",function(event){
					if(event.keyCode == 13)return;
					// console.log(event.keyCode);
					// 入力時挙動
					var newBean = $(".new.beans");
					newBean.data("move",1);
					newBean.removeClass("new");
					makeNewBean();
				});
				makeNewBean();


				// 落下
				var g = 30;
				var interval = 15;
				var fixHeight = function(){
					var windowHeight = $("#contents").innerHeight() + $("#header").innerHeight() + $("#footer").innerHeight();
/*					if($("#bean-area").innerHeight() < windowHeight){
						$("#bean-area").css("height", windowHeight+"px");
					}else{
						$("#bean-area").height("height", "100%");
					}
*/
				}
				var update = function(){
					fixHeight();
					var windowHeight = $("#contents").innerHeight() + $("#header").innerHeight() + $("#footer").innerHeight() - 380;	// #mail-formの上辺が0として調整
					$(".beans").each(function(){
						if($(this).data("move") == 0)return;

						var vx = $(this).data("vx");
						var vy = $(this).data("vy");
						vy = parseFloat(vy) + g*(interval/1000);
						$(this).data("vy",vy);
						var rotate = $(this).data("rotate");
						var rotateSpeed = $(this).data("rotateSpeed");
						rotate = (parseFloat(rotate)+parseInt(rotateSpeed))%360;
						$(this).data("rotate",rotate);

						$(this).css({top: "+="+parseInt(vy)+"px", left: "+="+parseInt(vx)+"px"});
						changeRotate($(this),rotate);

						if(parseInt($(this).css("top")) > windowHeight){
							$(this).remove();
							var notPlayings = [];
							for(var i=0; i<audioObjects.length; i++){
								if(audioPlaying[i] == 0)notPlayings.push(i);
							}
							if(notPlayings.length > 0){
								var audioIndex = notPlayings[parseInt(Math.random()*notPlayings.length)];
								audioPlaying[audioIndex] = 1;
								audioObjects[audioIndex].play();
							}
						}
					});
					setTimeout(function(){update();}, interval);
				}
				setTimeout(function(){update();}, interval);
			});
