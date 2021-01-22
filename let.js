$(document).ready(function()
			{
				var tabswitch=false;
				var h;
				$(window).focus(function() 
				{
        			tabswitch=false;
        			for(var i=0; i<$('table:eq(1) tr').length; i++)
        			{
        				if($('table:eq(1) tr:eq('+i+')').hasClass("bg-active"))
        				{
        					if($('table:eq(1) tr:eq('+i+')').find("span").text()=="New")
							{
								h=i;
								setTimeout(function()
								{
									$('table:eq(1) tr:eq('+h+')').find("span").text("").removeClass("blink");
									$("th."+h+" div").css("font-weight","normal");

									var p=$(".recordnew span").data("count") || 0;
									$(".recordnew span").data("count",--p).text(p);
									$("title").text("QuickChat • New Messages ("+p+")");
									if(p<=0)
									{
										$(".recordnew span").hide('slow');
										$(".recordnew").html("No New Messages <span style='display:none;' class='badge badge-light blink'>0</span>");
										$("title").text("QuickChat");
									}

									setTimeout(function()
									{
										$("div.msg"+h).animate({scrollTop: $("div.msg"+h).prop('scrollHeight')-0+100000}, 2000);
									},10);
								},1500);
							}
        				}
        			}
    			});
    			$(window).blur(function() 
    			{
        			tabswitch=true;
    			});
    			var signout=true;
    			$("a.SignOut").click(function()
    			{
    				$("#login").modal("show");
    				$("#signStatus").text("Signing Out");
    				$("div.txt,div.profile").hide("slow");
					$("div.txt").attr("data-active","");
            		$("div.profile").attr("data-active","");
					$("table:eq(1) tr:gt(0)").removeClass("bg-active");

					var $allVideos = $('video');
					$allVideos.each(function() 
					{
    					this.pause();
    				});
					signout=true;
					$("title").text("QuickChat");
    				setTimeout(function()
    				{
    					$("div.custom-container:eq(0)").hide();
    					setTimeout(function()
    					{
    						$("div.custom-container:eq(1)").show();
    						$("table.signInTable").parent().removeAttr("novalidate");
    						setTimeout(function()
    						{    							
    							$("#login").modal("hide");
    						},1500);
    					},1500);
    				},1500);
    			});
    			var cancel=0;
    			var account=[{phone:"9780831702", password:"Guriqbal@123"}];
    			$("button.signIn").click(function()
    			{
    				if($("table.signInTable input:eq(0)").val()!="" && $("table.signInTable input:eq(1)").val()!="")
    				{
    					for(var o=0; o<account.length; o++)
    					{
    						if($("table.signInTable input:eq(0)").val()==account[o].phone && $("table.signInTable input:eq(1)").val()==account[o].password)
    						{
    							$("#login").modal("show");
    							$("#signStatus").text("Signing In");

    							clearTimeout(cancel);
    							$("div.custom-container:eq(1)").find("span").hide();

    							signout=false;
    							setTimeout(function()
    							{
    								$("table.signInTable input:eq(0)").val("");
    								$("table.signInTable input:eq(1)").val("");
    								$("table.signInTable").parent().attr("novalidate",true);
    								$("div.custom-container:eq(1)").hide();
    								setTimeout(function()
    								{
    									$("div.custom-container:eq(0)").show();
    									var cnew=0;
    									for(var i=0; i<$("table:eq(1) tr").length; i++)
    									{
    										if($("table:eq(1) tr:eq("+i+") th span").hasClass("blink"))
    										{
    											cnew++;
    										}
    									}
    									if(cnew>0)
    									{
    										$("title").text("QuickChat • New Messages ("+cnew+")");
    									}
    									setTimeout(function()
    									{    							
    										$("#login").modal("hide");
    									},1500);
    								},1500);
    							},1500);
    						}
    						else if($("table.signInTable input:eq(0)").val()>=6000000000 && $("table.signInTable input:eq(0)").val()<=9999999999)
    						{
    							$("div.custom-container:eq(1)").find("span").fadeIn(1500);
							cancel = setTimeout(function(){$("div.custom-container:eq(1)").find("span").fadeOut(1500);},5000);
							}
						}
					}
    			});
				$('span:first').click(function()
				{
					var i=$(this).data("count") || 0;
					if(i%2==1)
					{
						$(this).text("Online").addClass('badge-success').removeClass('badge-danger');
					}
					else
					{
						$(this).text("Offline").addClass('badge-danger').removeClass('badge-success');
					}
					$(this).data("count",++i);
				});
				$("input:eq(0)").on("keyup", function() 
				{
    				var value = $(this).val().toLowerCase();
    				$("table:eq(1) tr").filter(function() 
    				{
      					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    				});
 				 });
				$("div.txt div i:eq(0)").click(function()
				{
					if($("div.txt div:eq(0) label label:eq(0)").text().charAt(0)=="+")
					{
						var i=$("div.txt").attr("data-active");

						var j = $("div.msg"+i).data("count") || 0;
						if(j==0)
						{
							$("div.txt,div.profile").hide("slow",function()
							{
								$("th."+i).parent().remove();
								$("div.status"+i).remove();
								setTimeout(function(){$("div.msg"+i).remove();},500);
							});
						}
					}
					$("div.txt,div.profile").hide("slow");
					$("div.txt").attr("data-active","");
            		$("div.profile").attr("data-active","");
					$("table:eq(1) tr:gt(0)").removeClass("bg-active");

					var $allVideos = $('video');
					$allVideos.each(function() 
					{
    					this.pause();
    				});
				});
				$("div.profile div i:eq(0)").click(function()
				{
					$("div.profile").hide("slow");
				});
				var colors = ["Lime","Aqua","Crimson","yellow","Peru","Violet","orange","pink"];
				$('.send,.sendmedia,.sendcontact,.senddocument,.sendgroup').on("click",function()
				{
					$("div#addMedia").modal("hide");
					$("div#shareContact").modal("hide");
					$("div#shareDocument").modal("hide");
					$("div#inviteText").modal("hide");

					var i=$("div.txt").attr("data-active");
					$("div.msg"+i).attr("data-running",1);

					var j = $("div.msg"+i).data("count") || 0;

					var photo=$("div.msg"+i).data("photo") || 0;
					var video=$("div.msg"+i).data("video") || 0;
					var docum=$("div.msg"+i).data("docum") || 0;
					var ccard=$("div.msg"+i).data("ccard") || 0;
					var tonly=$("div.msg"+i).data("tonly") || 0;

					if($("input[placeholder='Type a message']").val()!="" || ($("img.newUploadImage").attr("src")!=undefined && $("img.newUploadImage").attr("src")!="") || ($("video.newUploadVideo").attr("src")!=undefined && $("video.newUploadVideo").attr("src")!="") || ($("#shareContact").find("table tr").length==1) || ($("#shareDocument").find("a").attr("href")!="#") || ($("#inviteText").find("table tr").length==1))
					{
						if(j==0)
						{
							if($("img.newUploadImage").attr("src")!=undefined && $("img.newUploadImage").attr("src")!="")
							{
								$("div.msg"+i).prepend("<div class='list-group-item bg-dark text-white myTxt' style='border-radius:20px 20px 10px 10px;margin:10px 0px 0px 286px;width:260px;'><img style='height:280px;width:260px;border-radius:20px 20px 1px 1px;margin:-13px 0px -10px -21px;object-fit:cover;' src="+$("img.newUploadImage").attr("src")+"><label style='margin-bottom:-11px;padding:12px 0px 5px 0px;'>"+$("#addMedia").find("input").val()+"</label></div>");
							}
							else if($("video.newUploadVideo").attr("src")!=undefined && $("video.newUploadVideo").attr("src")!="")
							{
								$("div.msg"+i).prepend("<div class='list-group-item bg-dark text-white myTxt' style='border-radius:10px 10px 5px 5px;margin:10px 0px 0px 286px;width:260px;'><video style='height:280px;width:260px;border-radius:10px 10px 1px 1px;margin:-13px 0px -10px -21px;object-fit:cover;' src="+$("video.newUploadVideo").attr("src")+" controls></video><label style='margin-bottom:-11px;padding:12px 0px 5px 0px;'>"+$("#addMedia").find("input").val()+"</label></div>");
							}
							else if(($("#shareContact").find("table tr").length==1))
							{
								var img="<img class='rounded-circle' src="+$("#shareContact").find("table tr").find("img").attr("src")+" height='60' width='53' style='object-fit:cover;'>";
								var name="&nbsp;&nbsp;<label style='font-size:20px'>"+$("#shareContact").find("table tr").find("label:eq(0)").text()+"</label>";
								var about="<label style='display:none;'>"+$("#shareContact").find("table tr").find("label:eq(1)").text()+"</label>";
								var contact="<br><label style='margin:-20px 20px 0px 0px; font-size:13.9px;font-weight:normal:position:relative;float:right;'>"+$("#shareContact").find("table tr").find("div").text()+"</label>";

								$("div.msg"+i).prepend("<div class='list-group-item bg-dark text-white myTxt' style='border-radius:10px;margin:10px 0px 0px 320px;width:226px;'>"+img+name+about+contact+"<span class='btn btn-sm badge-pill btn-primary saveCC' style='margin:5px 0px 0px 0px;'>Save Contact</span><span class='btn btn-sm badge-pill btn-success txtCC' style='margin:5px 0px 0px 10px;'>Message</span><label style='margin-bottom:-11px;padding:12px 0px 5px 0px;'>"+$("input[placeholder='Tell something about this person']").val()+"</label></div>");
							}
							else if($("#inviteText").find("table tr").length==1)
							{
								var img="<img class='rounded-circle' src="+$("#inviteText").find("table tr").find("img").attr("src")+" height='60' width='53' style='object-fit:cover;'>";
								var name="&nbsp;&nbsp;<label style='font-size:20px'>"+$("#inviteText").find("table tr").find("label:eq(0)").text()+"</label>";
								var about="<label style='display:none;'>"+$("#inviteText").find("table tr").find("label:eq(1)").text()+"</label>";
								var info="<br><label style='margin:-20px 0px 0px 56px; font-size:13px;font-weight:normal:position:relative;'>"+$("#inviteText").find("table tr").find("div").text()+"</label>";

								$("div.msg"+i).prepend("<div class='list-group-item bg-dark text-white myTxt' style='border-radius:10px;margin:10px 0px 0px 320px;width:226px;'>"+img+name+about+info+"<span class='btn btn-sm badge-pill btn-primary joinGroup' style='margin:5px 0px 0px 0px;width:180px;'>Join Group</span><label style='margin-bottom:-11px;padding:12px 0px 5px 0px;'>"+$("input[placeholder='Tell something about this group']").val()+"</label></div>");
							}
							else if($("#shareDocument").find("a").attr("href")!="#")
							{
								var name=$("#shareDocument").find("a").attr("data-name");
								if(name.length>23)
								{
									name=name.slice(0,17)+"...pdf";
								}
								var doc="<a href="+$("#shareDocument").find("a").attr("href")+" target='_blank' style='text-decoration:none;color:white;'><i class='fas fa-file-pdf text-light' style='font-size:37px;'></i>&nbsp;&nbsp;"+name+"</a>"

								$("div.msg"+i).prepend("<div class='list-group-item bg-dark text-white myTxt' style='border-radius:10px;margin:10px 0px 0px 300px;padding:15px;width:246px;'>"+doc+"<label style='margin-bottom:-11px;padding:12px 0px 5px 0px;'>"+$("input[placeholder='About this file...']").val()+"</label></div>");
							}
							else
							{
								$("div.msg"+i).prepend("<div class='list-group-item bg-dark text-white myTxt' style='border-radius:10px;margin:10px 0px 0px 355px;width:190px;'><label style='margin-bottom:-3px !important;padding-bottom:-3px !important;'>"+$("input[placeholder='Type a message']").val()+"</label></div>");
							}
						}
						else
						{
							if($("img.newUploadImage").attr("src")!=undefined && $("img.newUploadImage").attr("src")!="")
							{
								$('div.msg'+i+' div:eq('+(j-1)+')').after("<div class='list-group-item bg-dark text-white myTxt' style='border-radius:20px 20px 10px 10px; margin:10px 0px 0px 286px;width:260px;'><img style='height:280px;width:260px;border-radius:20px 20px 1px 1px;margin:-13px 0px -10px -21px;object-fit:cover;' src="+$("img.newUploadImage").attr("src")+"><label style='margin-bottom:-11px;padding:12px 0px 5px 0px;'>"+$("#addMedia").find("input").val()+"</label></div>");
							}
							else if($("video.newUploadVideo").attr("src")!=undefined && $("video.newUploadVideo").attr("src")!="")
							{
								$('div.msg'+i+' div:eq('+(j-1)+')').after("<div class='list-group-item bg-dark text-white myTxt' style='border-radius:10px 10px 5px 5px;margin:10px 0px 0px 286px;width:260px;'><video style='height:280px;width:260px;border-radius:10px 10px 1px 1px;margin:-13px 0px -10px -21px;object-fit:cover;' src="+$("video.newUploadVideo").attr("src")+" controls></video><label style='margin-bottom:-11px;padding:12px 0px 5px 0px;'>"+$("#addMedia").find("input").val()+"</label></div>");
							}
							else if(($("#shareContact").find("table tr").length==1))
							{
								var img="<img class='rounded-circle' src="+$("#shareContact").find("table tr").find("img").attr("src")+" height='60' width='53' style='object-fit:cover;'>";
								var name="&nbsp;&nbsp;<label style='font-size:19px'>"+$("#shareContact").find("table tr").find("label:eq(0)").text()+"</label>";
								var about="<label style='display:none;'>"+$("#shareContact").find("table tr").find("label:eq(1)").text()+"</label>";
								var contact="<br><label style='margin:-20px 20px 0px 0px; font-size:13.9px;font-weight:normal:position:relative;float:right;'>"+$("#shareContact").find("table tr").find("div").text()+"</label>";

								$('div.msg'+i+' div:eq('+(j-1)+')').after("<div class='list-group-item bg-dark text-white myTxt' style='border-radius:10px;margin:10px 0px 0px 320px;width:226px;'>"+img+name+about+contact+"<span class='btn btn-sm badge-pill btn-primary saveCC' style='margin:5px 0px 0px 0px;'>Save Contact</span><span class='btn btn-sm badge-pill btn-success txtCC' style='margin:5px 0px 0px 10px;'>Message</span><label style='margin-bottom:-11px;padding:12px 0px 5px 0px;'>"+$("input[placeholder='Tell something about this person']").val()+"</label></div>");
							}
							else if($("#inviteText").find("table tr").length==1)
							{
								var img="<img class='rounded-circle' src="+$("#inviteText").find("table tr").find("img").attr("src")+" height='60' width='53' style='object-fit:cover;'>";
								var name="&nbsp;&nbsp;<label style='font-size:20px'>"+$("#inviteText").find("table tr").find("label:eq(0)").text()+"</label>";
								var about="<label style='display:none;'>"+$("#inviteText").find("table tr").find("label:eq(1)").text()+"</label>";
								var info="<br><label style='margin:-20px 0px 0px 56px; font-size:13px;font-weight:normal:position:relative;'>"+$("#inviteText").find("table tr").find("div").text()+"</label>";

								$('div.msg'+i+' div:eq('+(j-1)+')').after("<div class='list-group-item bg-dark text-white myTxt' style='border-radius:10px;margin:10px 0px 0px 320px;width:226px;'>"+img+name+about+info+"<span class='btn btn-sm badge-pill btn-primary joinGroup' style='margin:5px 0px 0px 0px;width:180px;'>Join Group</span><label style='margin-bottom:-11px;padding:12px 0px 5px 0px;'>"+$("input[placeholder='Tell something about this group']").val()+"</label></div>");
							}
							else if($("#shareDocument").find("a").attr("href")!="#")
							{
								var name=$("#shareDocument").find("a").attr("data-name");
								if(name.length>23)
								{
									name=name.slice(0,17)+"...pdf";
								}
								var doc="<a href="+$("#shareDocument").find("a").attr("href")+" target='_blank' style='text-decoration:none;color:white;'><i class='fas fa-file-pdf text-light' style='font-size:37px;'></i>&nbsp;&nbsp;"+name+"</a>"

								$('div.msg'+i+' div:eq('+(j-1)+')').after("<div class='list-group-item bg-dark text-white myTxt' style='border-radius:10px;margin:10px 0px 0px 300px;padding:15px;width:246px;'>"+doc+"<label style='margin-bottom:-11px;padding:12px 0px 5px 0px;'>"+$("input[placeholder='About this file...']").val()+"</label></div>");
							}
							else
							{
								$('div.msg'+i+' div:eq('+(j-1)+')').after("<div class='list-group-item bg-dark text-white myTxt' style='border-radius:10px;margin:10px 0px 0px 345px;width:200px;'><label style='margin-bottom:-3px !important;padding-bottom:-3px !important;'>"+$("input[placeholder='Type a message']").val()+"</label></div>");			
							}
						}
						var emoji_regex = /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/;

						if(emoji_regex.test($("div.msg"+i+" div:eq("+j+") label:last").text())==true)
						{
							$("div.msg"+i+" div:eq("+j+") label:last").css("font-size","27px");
						}

						$("th."+i).parent().insertBefore("table:eq(1) tr:eq(0)");

						if($("img.newUploadImage").attr("src")!=undefined && $("img.newUploadImage").attr("src")!="")
						{
							$("th."+i+" div").css("font-weight","normal").text("You: 📸 Photo");
							$("div.msg"+i).data("photo",++photo);
						}
						else if($("video.newUploadVideo").attr("src")!=undefined && $("video.newUploadVideo").attr("src")!="")
						{
							$("th."+i+" div").css("font-weight","normal").text("You: 🎥 Video");
							$("div.msg"+i).data("video",++video);
						}
						else if(($("#shareContact").find("table tr").length==1))
						{
							$("th."+i+" div").css("font-weight","normal").text("You: 📇 Contact Card");
							$("div.msg"+i).data("ccard",++ccard);
						}
						else if($("#inviteText").find("table tr").length==1)
						{
							$("th."+i+" div").css("font-weight","normal").text("You: 👩🏻‍🤝‍🧑🏼 Group Invite");
						}
						else if($("#shareDocument").find("a").attr("href")!="#")
						{
							$("th."+i+" div").css("font-weight","normal").text("You: 📨 Document");
							$("div.msg"+i).data("docum",++docum);
						}
						else
						{
							if($("input[placeholder='Type a message']").val().length<=15)
							{
								$("th."+i+" div").css("font-weight","normal").text("You: "+$("input[placeholder='Type a message']").val());
							}
							else
							{
								$("th."+i+" div").css("font-weight","normal").text("You: "+$("input[placeholder='Type a message']").val().slice(0,15)+"....");
							}
							$("div.msg"+i).data("tonly",++tonly);
						}

						$("div.msg"+i).data("photo",photo);
						$("div.msg"+i).data("video",video);
						$("div.msg"+i).data("ccard",ccard);
						$("div.msg"+i).data("docum",docum);
						$("div.msg"+i).data("tonly",tonly);
						if($(".profile").attr("data-active")==i)
						{
							$("table.stats tr:eq(0) td label:eq(1)").text(photo+video);
							$("table.stats tr:eq(1) td label:eq(1)").text(docum);
							$("table.stats tr:eq(2) td label:eq(1)").text(ccard);
							$("table.stats tr:eq(3) td label:eq(1)").text(tonly);
						}
						$("div.msg"+i).data("count", ++j);
						$("div.chat-thread").animate({scrollTop: 0}, 2000);

						setTimeout(function()
						{
							$('div.msg'+i).find('.txtstatus').remove();
							$('div.msg'+i+' div:eq('+(j-1)+')').after("<span style='color:white;margin-left:505px;' class='txtstatus'>Sent</span>");
							setTimeout(function()
							{
								if(i.charAt(0)!="g")
								{
									$('div.msg'+i).find('.txtstatus').css("margin-left","475px").text("Delivered");
								}

								$("div.msg"+i).animate({scrollTop: $("div.msg"+i).prop('scrollHeight')-0+100000}, 2000);
								setTimeout(function()
								{
									var pre=$("div.msg"+i).attr("data-predefined-txts")-0;
									if($('div.msg'+i+' div:hidden').length==0)
									{
										$('div.status'+i).text("Offline").addClass('badge-danger').removeClass('badge-success');
										$("div.msg"+i).attr("data-running",0);
									}
									else
									{
										setTimeout(function()
										{
											if(i.charAt(0)!="g")
											{
												$('div.msg'+i).find('.txtstatus').css("margin-left","505px").text("Seen");
											}
											setTimeout(function()
											{
												$('div.status'+i).text("Typing...");
												if(i.charAt(0)!="g")
												{
													$("table:eq(1) tr th."+i+" span:last").removeClass("badge-primary blink").addClass("badge-success").html("Typing...");
												}
												else
												{
													$("table:eq(1) tr th."+i+" span:last").removeClass("badge-primary mt-n4 blink").addClass("badge-success mt-n5").css({"font-size":"10px","padding":"5px !important","float":"right","height":"30px","width":"100px"}).html($('div.msg'+i+' div:eq('+j+') em').text()+"<br>is Typing...");
												}
												setTimeout(function()
												{
													$('div.msg'+i).find('.txtstatus').remove();
													$('div.status'+i).text("Active Now");
													$("table:eq(1) tr th."+i+" span:last").html("");
													$('div.msg'+i+' div:eq('+j+')').show(1500,function()
													{
														if(i.charAt(0)!="g")
														{
															$("table:eq(1) tr th."+i).parent().show();
														}

														var emoji_regex = /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/;

														if(emoji_regex.test($("div.msg"+i+" div:eq("+j+") label:last").text())==true)
														{
															$("div.msg"+i+" div:eq("+j+") label:last").css("font-size","27px");
														}

														if($(this).find("em").length==1)
														{
															$(this).find("em").css("color",colors[Math.floor(Math.random() * colors.length)]);
														}
														
														$("th."+i).parent().insertBefore("table:eq(1) tr:eq(0)");

														if($(this).find("img").length==1 && $(this).find("label").length==1)
														{
															if($(this).find("em").length==1)
															{
																$("th."+i+" div").css("font-weight","normal").text($(this).find("em").text()+": 📸 Photo");
															}	
															else
															{
																$("th."+i+" div").css("font-weight","normal").text("📸 Photo");
															}
															$("div.msg"+i).data("photo",$("div.msg"+i).data("photo")-0+1);
														}
														else if($(this).find("video").length==1 && $(this).find("label").length==1)
														{
															if($(this).find("em").length==1)
															{
																$("th."+i+" div").css("font-weight","normal").text($(this).find("em").text()+": 🎥 Video");
															}
															else
															{
																$("th."+i+" div").css("font-weight","normal").text("🎥 Video");
															}
															$("div.msg"+i).data("video",$("div.msg"+i).data("video")-0+1);
														}
														else if($(this).find("img").length==1 && $(this).find("label").length==4 && $(this).find("span").length==2)
														{
															if($(this).find("em").length==1)
															{
																$("th."+i+" div").css("font-weight","normal").text($(this).find("em").text()+": 📇 Contact Card");
															}
															else
															{
																$("th."+i+" div").css("font-weight","normal").text("📇 Contact Card");
															}
															$("div.msg"+i).data("ccard",$("div.msg"+i).data("ccard")-0+1);
														}
														else if($(this).find("img").length==1 && $(this).find("label").length==4 && $(this).find("span").length==1)
														{
															if($(this).find("em").length==1)
															{
																$("th."+i+" div").css("font-weight","normal").text($(this).find("em").text()+": 👩🏻‍🤝‍🧑🏼 Group Invite");
															}
															else
															{
																$("th."+i+" div").css("font-weight","normal").text("👩🏻‍🤝‍🧑🏼 Group Invite");
															}
														}
														else if($(this).find("a").length==1 && $(this).find("label").length==1)
														{
															if($(this).find("em").length==1)
															{
																$("th."+i+" div").css("font-weight","normal").text($(this).find("em").text()+": 📨 Document");
															}
															else
															{
																$("th."+i+" div").css("font-weight","normal").text("📨 Document");
															}
															$("div.msg"+i).data("docum",$("div.msg"+i).data("docum")-0+1);
														}
														else
														{
															var d=$(this).find("label:last").text();
															if($(this).find("em").length==1)
															{
																d=$(this).find("em").text()+": "+d;
															}
															if(d<=25)
															{
																$("th."+i+" div").css("font-weight","normal").text(d);
															}
															else
															{
																$("th."+i+" div").css("font-weight","normal").text(d.slice(0,25)+"....");
															}
															$("div.msg"+i).data("tonly",$("div.msg"+i).data("tonly")-0+1);
														}
														if($(".profile").attr("data-active")==i)
														{
															var x=$("div.msg"+i).data("photo")-0;
															var z=$("div.msg"+i).data("video")-0;

															$("table.stats tr:eq(0) td label:eq(1)").text(x+z);
															$("table.stats tr:eq(1) td label:eq(1)").text($("div.msg"+i).data("docum"));
															$("table.stats tr:eq(2) td label:eq(1)").text($("div.msg"+i).data("ccard"));
															$("table.stats tr:eq(3) td label:eq(1)").text($("div.msg"+i).data("tonly"));
														}

														$("div.msg"+i).data("count", ++j);

														var l=$("div.txt").attr("data-active");

														if(tabswitch || l!=i)
														{
															if(i.charAt(0)!='g')
															{
																$("table:eq(1) tr th."+i+" span:last").removeClass("badge-success").addClass("badge-primary blink").html("New");
															}
															else
															{
																$("table:eq(1) tr th."+i+" span:last").removeClass("badge-success mt-n5").addClass("badge-primary blink mt-n4").css({"font-size":"10px","padding":"","float":"right","height":"","width":""}).html("New");
															}
															$("th."+i+" div").css("font-weight","bold");

															if(i.charAt(0)!='g' || (i.charAt(0)=='g' && $("table:eq(1) tr th."+i).parent().css("display")!="none"))
															{
																var p=$(".recordnew span").data("count") || 0;
																var t=$(".recordnew span").data("thread") || "";
																if(t.indexOf(i)==-1)
																{
																	$(".recordnew").html("New Messages <span style='display:none;' class='badge badge-light blink'>0</span>");
																	$(".recordnew span").data("count",++p).text(p).data("thread",$(".recordnew span").data("thread")+" "+i).show('slow');
																}
															
																if(signout==false)
																{
																	if(t.indexOf(i)==-1)
																	{
																		$("title").text("QuickChat • New Messages ("+p+")");
																	}
																	var audio = new Audio('pristine.mp3');
																	audio.play();
																}
															}
														}	

														$("div.msg"+i).animate({scrollTop: $("div.msg"+i).prop('scrollHeight')-0+100000}, 2000);
														$("div.msg"+i).attr("data-running",0);
													});
												},6000);
											},1000);
										},3000);
									}
								},2000);
							},500);
						},500);
						$("input[placeholder='Type a message']").val("");

						$("#addMedia").find("input").val("");
						$("img.newUploadImage").attr("src","");
						$("video.newUploadVideo").attr("src","");

						$("input[placeholder='Tell something about this person']").val("");
						$("input[placeholder='Tell something about this group']").val("");

						$("#shareDocument").find("a").attr("href","#");
						$("#shareDocument").find("input").text("");
					}
				});

				$('table:eq(1)').on("click",'tr',function()
				{
					$('table:eq(1) tr').removeClass("bg-active");
					$(this).addClass("bg-active");

					var i=$(this).children("th").attr("class");

					$("div.msg").css("display","none");
					$("div.msg"+i).css("display","block");

					$("div.status").css("display","none");
					$("div.status"+i).css("display","block");

					$(".txt,.profile").css("display","none");

					$(".txt").attr("data-active",i);
					$(".profile").attr("data-active",i);

					var photo=$("div.msg"+i).data("photo") || 0;
					var video=$("div.msg"+i).data("video") || 0;
					var docum=$("div.msg"+i).data("docum") || 0;
					var ccard=$("div.msg"+i).data("ccard") || 0;
					var tonly=$("div.msg"+i).data("tonly") || 0;
					$("table.stats tr:eq(0) td label:eq(1)").text(photo+video);
					$("table.stats tr:eq(1) td label:eq(1)").text(docum);
					$("table.stats tr:eq(2) td label:eq(1)").text(ccard);
					$("table.stats tr:eq(3) td label:eq(1)").text(tonly);

					$("div.profile").find("span.bt").hide();

					$("div.txt div label img").attr("src",$(this).find("img").attr("src"));

					if(i.charAt(0)=='u')
					{
						if($("div.msg"+i).attr("data-updating")==0)
						{
							$("div.txt div label label:eq(0)").css("font-size","21px").text($(this).find("label:eq(0)").text());
							$("div.txt div label label:eq(0)").css("margin-top","10px");

							$("div.profile").find("table:eq(0) tr td h2").css("font-size","25px").text($(this).find("label:eq(0)").text());
							$("div.profile").find("table:eq(0) tr td label").text($(this).find("label:eq(2)").text());
							$("div.profile").find("table:eq(0)").find("div").css("margin-top","-20px");
							$("div.profile div:eq(0) label").text("Contact Info").css("margin-left","28%");

							$("button.saveCI").hide();
							$("button.deleteContact").text("Delete Contact");

							$("table.groupTable").hide();
							$(".editDP").hide();
							$("div.txt div label label:eq(1)").hide();
						}
						else
						{
							$("div.txt div label label:eq(0)").css("font-size","17px").text($(this).find("label:eq(2)").text());
							$("div.txt div label label:eq(0)").css("margin-top","10px");

							$("div.profile").find("table:eq(0) tr td h2").css("font-size","21px").text($(this).find("label:eq(2)").text());
							$("div.profile").find("table:eq(0) tr td label").text("~ "+$(this).find("label:eq(0)").text());
							$("div.profile").find("table:eq(0)").find("div").css("margin-top","-20px");
							$("div.profile div:eq(0) label").text("Contact Info").css("margin-left","28%");

							$("button.saveCI").show();
							$(".editDP").hide();
							$("button.deleteContact").text("Delete Chat");

							$("table.groupTable").hide();
							$("div.txt div label label:eq(1)").hide();
						}

					}
					else if(i.charAt(0)=='k')
					{
						if($("div.msg"+i).attr("data-updating")==0)
						{
							$("div.txt div label label:eq(0)").css("font-size","17px").text($(this).find("label:eq(2)").text());
							$("div.txt div label label:eq(0)").css("margin-top","10px");

							$("div.profile").find("table:eq(0) tr td h2").css("font-size","21px").text($(this).find("label:eq(2)").text());
							$("div.profile").find("table:eq(0) tr td label").text("~ "+$(this).find("label:eq(0)").text());
							$("div.profile").find("table:eq(0)").find("div").css("margin-top","-20px");
							$("div.profile div:eq(0) label").text("Contact Info").css("margin-left","28%");

							$("button.saveCI").show();
							$(".editDP").hide();
							$("button.deleteContact").text("Delete Chat");

							$("table.groupTable").hide();
							$("div.txt div label label:eq(1)").hide();
						}
						else
						{
							$("div.txt div label label:eq(0)").css("font-size","21px").text($(this).find("label:eq(0)").text());
							$("div.txt div label label:eq(0)").css("margin-top","10px");

							$("div.profile").find("table:eq(0) tr td h2").css("font-size","25px").text($(this).find("label:eq(0)").text());
							$("div.profile").find("table:eq(0) tr td label").text($(this).find("label:eq(2)").text());
							$("div.profile").find("table:eq(0)").find("div").css("margin-top","-20px");
							$("div.profile div:eq(0) label").text("Contact Info").css("margin-left","28%");

							$("button.saveCI").hide();
							$(".editDP").hide();
							$("button.deleteContact").text("Delete Contact");

							$("table.groupTable").hide();
							$("div.txt div label label:eq(1)").hide();
						}
					}
					else
					{
						$("div.txt div label label:eq(0)").css("font-size","21px").text($(this).find("label:eq(0)").text());
						$("div.txt div label label:eq(0)").css("margin-top","7px");

						$("div.profile").find("table:eq(0) tr td h2").css("font-size","25px").text($(this).find("label:eq(0)").text());
						$("div.profile").find("table:eq(0) tr td label").text($(this).find("label:eq(2)").text());
						$("div.profile").find("table:eq(0)").find("div").css("margin-top","-20px");
						$("div.profile div:eq(0) label").text("Group Info").css("margin-left","30%");

						$("button.saveCI").hide();
						$("button.deleteContact").text("Delete Group");

						$("table.groupTable").show();
						$("table.groupTable tr:gt(2)").remove();
						$("div.txt div label label:eq(1)").show();

						var adminCheck=$(".UserName").attr("data-adminControls").indexOf(i);
						if(adminCheck!=-1)
						{
							adminCheck=true;
							$("table.groupTable tr:lt(2)").show();
							$(".editDP").show();
							$("table.groupTable tr:eq(2) td").addClass("admin").append("<em class='badge badge-pill badge-light' style='float:right;margin:-45px 10px 0px 0px;'>Admin</em>");
						}
						else
						{
							adminCheck=false;
							$("table.groupTable tr:lt(2)").hide();
							$("table.groupTable tr:eq(2) td").removeClass("admin").find("em").remove();
						}
						

						var groupNames="";
						var par=$(this).find("#members").children().length;

						var a=[];
						var b=[];
						var an=[];
						var bn=[];
						for(var k=0; k<par; k++)
						{
							if($(this).find("#members").children("label:eq("+k+")").children("label:eq(0)").css("display")!="none")
							{
								an.push($(this).find("#members").children("label:eq("+k+")").children("label:eq(0)").text());
								a.push(k);
							}
							else
							{
								bn.push($(this).find("#members").children("label:eq("+k+")").children("label:eq(1)").text());
								b.push(k)
							}
						}
						for(var k=0; k<an.length-1; k++)
						{
							for(var l=0; l<an.length-k-1; l++)
							{
								if(an[l].localeCompare(an[l+1]) > 0)
								{
									var temp=an[l];
									an[l]=an[l+1];
									an[l+1]=temp;

									temp=a[l];
									a[l]=a[l+1];
									a[l+1]=temp;
								}
							}
						}
						for(var k=0; k<bn.length-1; k++)
						{
							for(var l=0; l<bn.length-k-1; l++)
							{
								if(bn[l].localeCompare(bn[l+1]) > 0)
								{
									var temp=bn[l];
									bn[l]=bn[l+1];
									bn[l+1]=temp;

									temp=b[l];
									b[l]=b[l+1];
									b[l+1]=temp;
								}
							}
						}
						a=a.concat(b);

						for(var z=0; z<par; z++)
						{
							var options;
							if(adminCheck)
							{
								if($(this).find("#members").children("label:eq("+a[z]+")").children("label:eq(0)").css("display")!="none")
								{
									if($(this).find("#members").children("label:eq("+a[z]+")").hasClass("admin"))
									{
										options="<div class='dropdown' style='float:right;position:relative;margin-top:-15px;'><button type='button' class='btn btn-dark dropdown-toggle dropdown-toggle-split' data-toggle='dropdown'></button><div class='dropdown-menu bg-dark' style='line-height:25px;'><label class='dropdown-item text-white viewInfo'>View Info</label><label class='dropdown-item text-white txtGroup'>Send Message</label><label class='dropdown-item text-white removeAdmin'>Dismiss as Admin</label><label class='dropdown-item text-white removefromGroup'>Remove from Group</label></div></div>";
									}
									else
									{
										options="<div class='dropdown' style='float:right;position:relative;margin-top:-15px;'><button type='button' class='btn btn-dark dropdown-toggle dropdown-toggle-split' data-toggle='dropdown'></button><div class='dropdown-menu bg-dark' style='line-height:25px;'><label class='dropdown-item text-white viewInfo'>View Info</label><label class='dropdown-item text-white txtGroup'>Send Message</label><label class='dropdown-item text-white addAdmin'>Make Group Admin</label><label class='dropdown-item text-white removefromGroup'>Remove from Group</label></div></div>";
									}
									groupNames=groupNames+$(this).find("#members").children("label:eq("+a[z]+")").children("label:eq(0)").text()+", ";
								}
								else
								{
									if($(this).find("#members").children("label:eq("+a[z]+")").hasClass("admin"))
									{
										options="<div class='dropdown' style='float:right;position:relative;margin-top:-15px;'><button type='button' class='btn btn-dark dropdown-toggle dropdown-toggle-split' data-toggle='dropdown'></button><div class='dropdown-menu bg-dark' style='line-height:25px;'><label class='dropdown-item text-white viewInfo'>View Info</label><label class='dropdown-item text-white txtGroup'>Send Message</label><label class='dropdown-item text-white saveGroup'>Add to Contacts</label><label class='dropdown-item text-white removeAdmin'>Dismiss as Admin</label><label class='dropdown-item text-white removefromGroup'>Remove from Group</label></div></div>";
									}
									else
									{
										options="<div class='dropdown' style='float:right;position:relative;margin-top:-15px;'><button type='button' class='btn btn-dark dropdown-toggle dropdown-toggle-split' data-toggle='dropdown'></button><div class='dropdown-menu bg-dark' style='line-height:25px;'><label class='dropdown-item text-white viewInfo'>View Info</label><label class='dropdown-item text-white txtGroup'>Send Message</label><label class='dropdown-item text-white saveGroup'>Add to Contacts</label><label class='dropdown-item text-white addAdmin'>Make Group Admin</label><label class='dropdown-item text-white removefromGroup'>Remove from Group</label></div></div>";
									}
									groupNames=groupNames+$(this).find("#members").children("label:eq("+a[z]+")").children("label:eq(1)").text()+", ";
								}
							}
							else
							{
								if($(this).find("#members").children("label:eq("+a[z]+")").children("label:eq(0)").css("display")!="none")
								{
									options="<div class='dropdown' style='float:right;position:relative;margin-top:-15px;'><button type='button' class='btn btn-dark dropdown-toggle dropdown-toggle-split' data-toggle='dropdown'></button><div class='dropdown-menu bg-dark' style='line-height:25px;'><label class='dropdown-item text-white viewInfo'>View Info</label><label class='dropdown-item text-white txtGroup'>Send Message</label></div></div>";

									groupNames=groupNames+$(this).find("#members").children("label:eq("+a[z]+")").children("label:eq(0)").text()+", ";
								}
								else
								{
									options="<div class='dropdown' style='float:right;position:relative;margin-top:-15px;'><button type='button' class='btn btn-dark dropdown-toggle dropdown-toggle-split' data-toggle='dropdown'></button><div class='dropdown-menu bg-dark' style='line-height:25px;'><label class='dropdown-item text-white viewInfo'>View Info</label><label class='dropdown-item text-white txtGroup'>Send Message</label><label class='dropdown-item text-white saveGroup'>Add to Contacts</label></div></div>";

									groupNames=groupNames+$(this).find("#members").children("label:eq("+a[z]+")").children("label:eq(1)").text()+", ";
								}
							}
							if($(this).find("#members").children("label:eq("+a[z]+")").hasClass("admin"))
							{
								var mem="<tr><td style='border-top:none !important;' class='admin'>"+$(this).find("#members").children("label:eq("+a[z]+")").html()+options+"<em class='badge badge-pill badge-light' style='float:right;position:static;margin:-45px -20px 0px 0px;'>Admin</em></td></tr>";
								$("table.groupTable").append(mem);
							}
							else
							{
								var mem="<tr><td style='border-top:none !important;'>"+$(this).find("#members").children("label:eq("+a[z]+")").html()+options+"</td></tr>";
								$("table.groupTable").append(mem);
							}
							
						}
						groupNames=groupNames.slice(0,groupNames.length-2);
						if(groupNames.length>70)
						{
							groupNames=groupNames.slice(0,70)+"...";
						}
						$("div.txt div label label:eq(1)").text(groupNames);
					}

					$("div.profile").find("table:eq(0) tr td h4").text($(this).find("label:eq(1)").text());

					if($(this).find("span:last").html()=="New")
					{
						$(this).find("span:last").html("").removeClass("blink");
						$("th."+i+" div").css("font-weight","normal");

						var p=$(".recordnew span").data("count") || 0;
						var t=$(".recordnew span").data("thread") || "";

						var q=t.indexOf(i);
						t=t.slice(0,q)+t.slice(q+i.length);
						$(".recordnew span").data("thread",t);
						$(".recordnew span").data("count",--p).text(p);
						$("title").text("QuickChat • New Messages ("+p+")");
						if(p<=0)
						{
							$(".recordnew span").hide('slow');
							$(".recordnew").html("No New Messages <span style='display:none;' class='badge badge-light blink'>0</span>");
							$("title").text("QuickChat");
						}

						setTimeout(function()
						{
							$("div.msg"+i).animate({scrollTop: $("div.msg"+i).prop('scrollHeight')-0+100000}, 2000);
						},10);
					}

					$('.txt').show('slow',function()
					{
						$("input[placeholder='Type a message']").focus();
					});

					var $allVideos = $('video');
					$allVideos.each(function() 
					{
    					this.pause();
    				});
				});

				$("div.txt").find("img:eq(0)").click(function()
				{
					$("div.profile").find("img:eq(0)").attr("src",$(this).attr("src"));
					$(".profile").show("slow",function()
					{
						$("div.profile-section").animate({scrollTop: 0}, 1000);
					});
				});

				$("table.edit tr td form div.input-group div i.input-group-text").click(function()
				{
					$(this).parent().siblings("input").attr("disabled",false);
					$(this).parent().siblings("input").focus();
					$(this).parent().parent().siblings("button.savechanges").show("slow");

					$("table.edit").data("name",$("table.edit").find("input:eq(0)").val());
					$("table.edit").data("about",$("table.edit").find("input:eq(1)").val());
					$("table.edit").data("contact",$("table.edit").find("input:eq(2)").val());
				});
				$("button.savechanges").on("click",function()
				{
					if($(this).siblings("div").children("input").val()!="")
					{
						$(this).siblings("div").children("input").attr("disabled",true);
						$(this).hide("slow");

						var n=$(this).siblings("div").children("input:eq(0)").val();
						var len=n.length;
						if(len>11)
						{
							len=11;
							n=n.slice(0,11);
						}
						if(n.indexOf(" ")!=-1)
						{
							len=n.indexOf(" ");
						}

						$("label.UserName").text(n.slice(0,len));

						$("table.edit").data("name",$("table.edit").find("input:eq(0)").val());
						$("table.edit").data("about",$("table.edit").find("input:eq(1)").val());
						$("table.edit").data("contact",$("table.edit").find("input:eq(2)").val());
					}
				});
				$("#myProfile").on("hidden.bs.modal", function()
				{
					$("table.edit").find("input").attr("disabled",true);
					$("table.edit").find("button").hide("slow");

					$("table.edit").find("input:eq(0)").val($("table.edit").data("name"));
					$("table.edit").find("input:eq(1)").val($("table.edit").data("about"));
					$("table.edit").find("input:eq(2)").val($("table.edit").data("contact"));
				});
				$("button.savenew").on("click",function()
				{
					var name=$("table.savecontact").find("input:eq(0)").val();
					var about=$("table.savecontact").find("input:eq(1)").val();
					var contact=$("table.savecontact").find("input:eq(2)").val();

					var countu=0;
					for(var m=0; m<=$("table:eq(1) tr").length-1; m++)
					{
						if($("table:eq(1) tr:eq("+m+") th").attr("class").charAt(0)=='u')
						{
							if(countu==0)
							{
								countu=$("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0;
							}
							else
							{
								if($("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0 > countu)
								{
									countu=$("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0;
								}
							}
						}
					}

					var flagu=0;
					for(var i=1; i<=countu; i++)
					{
						if($("table:eq(1) tr th.u"+i+" label:eq(2)").text()==="+91 "+contact.slice(0,5)+" "+contact.slice(5,10))
						{
							flagu=1;
							break;
						}
					}

					if(flagu==1)
					{
						if($("div.msgu"+i).attr("data-updating")==0)
						{
							$("div#newContact").find("span.bg-warning").text("User is already in your Contact List").fadeIn(1500);
							setTimeout(function(){$("div#newContact").find("span.bg-warning").fadeOut(1500);},5000);
						}
						else
						{
							$("div#newContact").find("span.bg-warning").text("Please just wait a few seconds").fadeIn(1500);
							setTimeout(function(){$("div#newContact").find("span.bg-warning").fadeOut(1500);},5000);
						}
					}
					else
					{
						var countk=0;
						for(var n=0; n<=$("table:eq(1) tr").length-1; n++)
						{
							if($("table:eq(1) tr:eq("+n+") th").attr("class").charAt(0)=='k')
							{
								if(countk==0)
								{
									countk=$("table:eq(1) tr:eq("+n+") th").attr("class").slice(1)-0;
								}
								else
								{
									if($("table:eq(1) tr:eq("+n+") th").attr("class").slice(1)-0 > countk)
									{
										countk=$("table:eq(1) tr:eq("+n+") th").attr("class").slice(1)-0;
									}
								}
							}
						}

						var flagk=0;
						for(var j=1; j<=countk; j++)
						{
							if($("table:eq(1) tr th.k"+j+" label:eq(2)").text()==="+91 "+contact.slice(0,5)+" "+contact.slice(5,10))
							{
								flagk=1;
								break;
							}
						}

						if(flagk==1)
						{
							if($("div.msgk"+j).attr("data-running")==1)
							{
								$("table:eq(1) tr th.k"+j).find("label:eq(0)").css({"display":"block","font-size":"17px","margin":"-35px 0px 18px 55px"});
								$("table:eq(1) tr th.k"+j).find("label:eq(2)").css({"display":"none","font-size":"16px"});

									var countg=0;
									for(var l=0; l<=$("table:eq(1) tr").length-1; l++)
									{
										if($("table:eq(1) tr:eq("+l+") th").attr("class").charAt(0)=='g')
										{
											if(countg==0)
											{
												countg=$("table:eq(1) tr:eq("+l+") th").attr("class").slice(1)-0;
											}
											else
											{
												if($("table:eq(1) tr:eq("+l+") th").attr("class").slice(1)-0 > countg)
												{
													countg=$("table:eq(1) tr:eq("+l+") th").attr("class").slice(1)-0;
												}
											}
										}
									}

									for(var r=1; r<=countg; r++)
									{
										if($(".g"+r).length==1)
										{
											var groupNames="";
											var par=$(".g"+r).find("#members").children().length;

											var a=[];
											var b=[];
											var an=[];
											var bn=[];
											for(var k=0; k<par; k++)
											{
												if($(".g"+r).find("#members").children("label:eq("+k+")").children("label:eq(0)").css("display")!="none")
												{
												an.push($(".g"+r).find("#members").children("label:eq("+k+")").children("label:eq(0)").text());
												a.push(k);
												}
												else
												{
													bn.push($(".g"+r).find("#members").children("label:eq("+k+")").children("label:eq(1)").text());
													b.push(k)
												}
											}
											for(var k=0; k<an.length-1; k++)
											{
												for(var l=0; l<an.length-k-1; l++)
												{
													if(an[l].localeCompare(an[l+1]) > 0)
													{
														var temp=an[l];
														an[l]=an[l+1];
														an[l+1]=temp;

														temp=a[l];
														a[l]=a[l+1];
														a[l+1]=temp;
													}
												}
											}
											for(var k=0; k<bn.length-1; k++)
											{
												for(var l=0; l<bn.length-k-1; l++)
												{
													if(bn[l].localeCompare(bn[l+1]) > 0)
													{
														var temp=bn[l];
														bn[l]=bn[l+1];
														bn[l+1]=temp;

														temp=b[l];
														b[l]=b[l+1];
														b[l+1]=temp;
													}
												}
											}
											a=a.concat(b);

											for(var z=0; z<par; z++)
											{
												if($(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(1)").text()=="+91 "+contact.slice(0,5)+" "+contact.slice(5,10))
												{
													$(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(0)").css({"display":"block","margin":"-40px 0px 0px 60px"});
													$(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(1)").css({"display":"none"});
													$(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(2)").css({"margin-top":"-25px"});

													if($(".g"+r).parent().hasClass("bg-active"))
													{
														var options;
														var adminCheck=$(".UserName").attr("data-adminControls").indexOf("g"+r);
														if(adminCheck!=-1)
														{
															adminCheck=true;
														}
														else
														{
															adminCheck=false;
														}
														if(adminCheck)
														{
															if($(".g"+r).find("#members").children("label:eq("+a[z]+")").hasClass("admin"))
															{
																options="<div class='dropdown' style='float:right;position:relative;margin-top:-15px;'><button type='button' class='btn btn-dark dropdown-toggle dropdown-toggle-split' data-toggle='dropdown'></button><div class='dropdown-menu bg-dark' style='line-height:25px;'><label class='dropdown-item text-white viewInfo'>View Info</label><label class='dropdown-item text-white txtGroup'>Send Message</label><label class='dropdown-item text-white removeAdmin'>Dismiss as Admin</label><label class='dropdown-item text-white removefromGroup'>Remove from Group</label></div></div>";
															}
															else
															{
																options="<div class='dropdown' style='float:right;position:relative;margin-top:-15px;'><button type='button' class='btn btn-dark dropdown-toggle dropdown-toggle-split' data-toggle='dropdown'></button><div class='dropdown-menu bg-dark' style='line-height:25px;'><label class='dropdown-item text-white viewInfo'>View Info</label><label class='dropdown-item text-white txtGroup'>Send Message</label><label class='dropdown-item text-white addAdmin'>Make Group Admin</label><label class='dropdown-item text-white removefromGroup'>Remove from Group</label></div></div>";
															}
														}
														else
														{
															options="<div class='dropdown' style='float:right;position:relative;margin-top:-15px;'><button type='button' class='btn btn-dark dropdown-toggle dropdown-toggle-split' data-toggle='dropdown'></button><div class='dropdown-menu bg-dark' style='line-height:25px;'><label class='dropdown-item text-white viewInfo'>View Info</label><label class='dropdown-item text-white txtGroup'>Send Message</label></div></div>";							
														}
														for(var v=3; v<$("table.groupTable tr").length; v++)
														{
															if($(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(1)").text()==$("table.groupTable tr:eq("+v+") td label:eq(1)").text())
															{
																break;
															}
														}
														if($(".g"+r).find("#members").children("label:eq("+a[z]+")").hasClass("admin"))
														{
															var mem="<td style='border-top:none !important;' class='admin'>"+$(".g"+r).find("#members").children("label:eq("+a[z]+")").html()+options+"<em class='badge badge-pill badge-light' style='float:right;position:static;margin:-45px -20px 0px 0px;'>Admin</em></td>";
															$("table.groupTable tr:eq("+v+")").html(mem);
														}
														else
														{
															var mem="<td style='border-top:none !important;'>"+$(".g"+r).find("#members").children("label:eq("+a[z]+")").html()+options+"</td>";
															$("table.groupTable tr:eq("+v+")").html(mem);
														}
													}
												}

												if($(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(0)").css("display")!="none")
												{
													groupNames=groupNames+$(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(0)").text()+", ";
												}
												else
												{
													groupNames=groupNames+$(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(1)").text()+", ";
												}
											}
											if($(".g"+r).parent().hasClass("bg-active"))
											{
												groupNames=groupNames.slice(0,groupNames.length-2);
												if(groupNames.length>70)
												{
													groupNames=groupNames.slice(0,70)+"...";
												}
												$("div.txt div label label:eq(1)").text(groupNames);
											}
										}
									}

								if($("table:eq(1) tr th.k"+j).parent().hasClass("bg-active"))
								{
									$("div.txt div label label:eq(0)").css("font-size","21px").text($("table:eq(1) tr th.k"+j).find("label:eq(0)").text());

									$("div.profile").find("table:eq(0) tr td h2").css("font-size","25px").text($("table:eq(1) tr th.k"+j).find("label:eq(0)").text());

									$("div.profile").find("table:eq(0) tr td label").text($("table:eq(1) tr th.k"+j).find("label:eq(2)").text());

									$("button.saveCI").hide();
									$("button.deleteContact").text("Delete Contact");
								}

								$("div#newContact").modal("toggle");
								$("span.updates").attr("data-updating",1).fadeIn(700);
								$("div.msgk"+j).attr("data-updating",1);

								setTimeout(function()
								{
									$("table:eq(1) tr th.k"+j).addClass("u"+(countu+1)).removeClass("k"+j);
									$("div.statusk"+j).addClass("statusu"+(countu+1)).removeClass("statusk"+j);
									$("div.msgk"+j).addClass("msgu"+(countu+1)).removeClass("msgk"+j);

									if($("table:eq(1) tr th.u"+(countu+1)).parent().hasClass("bg-active"))
									{
										$("div.txt").attr("data-active","u"+(countu+1));
										$("div.profile").attr("data-active","u"+(countu+1));
									}

									$("span.updates").attr("data-updating",0).fadeOut(700);
									$("div.msgk"+j).attr("data-updating",0);
									$("div.msgu"+(countu+1)).attr("data-updating",0);
								},14500);
							}
							else
							{
								if($("span.updates").attr("data-updating")==0)
								{
									$("table:eq(1) tr th.k"+j).addClass("u"+(countu+1)).removeClass("k"+j);
									$("div.statusk"+j).addClass("statusu"+(countu+1)).removeClass("statusk"+j);
									$("div.msgk"+j).addClass("msgu"+(countu+1)).removeClass("msgk"+j);

									$("table:eq(1) tr th.u"+(countu+1)).find("label:eq(0)").css({"display":"block","font-size":"17px","margin":"-35px 0px 18px 55px"});
									$("table:eq(1) tr th.u"+(countu+1)).find("label:eq(2)").css({"display":"none","font-size":"16px"});

									var countg=0;
									for(var l=0; l<=$("table:eq(1) tr").length-1; l++)
									{
										if($("table:eq(1) tr:eq("+l+") th").attr("class").charAt(0)=='g')
										{
											if(countg==0)
											{
												countg=$("table:eq(1) tr:eq("+l+") th").attr("class").slice(1)-0;
											}
											else
											{
												if($("table:eq(1) tr:eq("+l+") th").attr("class").slice(1)-0 > countg)
												{
													countg=$("table:eq(1) tr:eq("+l+") th").attr("class").slice(1)-0;
												}
											}
										}
									}

									for(var r=1; r<=countg; r++)
									{
										if($(".g"+r).length==1)
										{
											var groupNames="";
											var par=$(".g"+r).find("#members").children().length;

											var a=[];
											var b=[];
											var an=[];
											var bn=[];
											for(var k=0; k<par; k++)
											{
												if($(".g"+r).find("#members").children("label:eq("+k+")").children("label:eq(0)").css("display")!="none")
												{
												an.push($(".g"+r).find("#members").children("label:eq("+k+")").children("label:eq(0)").text());
												a.push(k);
												}
												else
												{
													bn.push($(".g"+r).find("#members").children("label:eq("+k+")").children("label:eq(1)").text());
													b.push(k)
												}
											}
											for(var k=0; k<an.length-1; k++)
											{
												for(var l=0; l<an.length-k-1; l++)
												{
													if(an[l].localeCompare(an[l+1]) > 0)
													{
														var temp=an[l];
														an[l]=an[l+1];
														an[l+1]=temp;

														temp=a[l];
														a[l]=a[l+1];
														a[l+1]=temp;
													}
												}
											}
											for(var k=0; k<bn.length-1; k++)
											{
												for(var l=0; l<bn.length-k-1; l++)
												{
													if(bn[l].localeCompare(bn[l+1]) > 0)
													{
														var temp=bn[l];
														bn[l]=bn[l+1];
														bn[l+1]=temp;

														temp=b[l];
														b[l]=b[l+1];
														b[l+1]=temp;
													}
												}
											}
											a=a.concat(b);

											for(var z=0; z<par; z++)
											{
												if($(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(1)").text()=="+91 "+contact.slice(0,5)+" "+contact.slice(5,10))
												{
													$(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(0)").css({"display":"block","margin":"-40px 0px 0px 60px"});
													$(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(1)").css({"display":"none"});
													$(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(2)").css({"margin-top":"-25px"});

													if($(".g"+r).parent().hasClass("bg-active"))
													{
														var options;
														var adminCheck=$(".UserName").attr("data-adminControls").indexOf("g"+r);
														if(adminCheck!=-1)
														{
															adminCheck=true;
														}
														else
														{
															adminCheck=false;
														}
														if(adminCheck)
														{
															if($(".g"+r).find("#members").children("label:eq("+a[z]+")").hasClass("admin"))
															{
																options="<div class='dropdown' style='float:right;position:relative;margin-top:-15px;'><button type='button' class='btn btn-dark dropdown-toggle dropdown-toggle-split' data-toggle='dropdown'></button><div class='dropdown-menu bg-dark' style='line-height:25px;'><label class='dropdown-item text-white viewInfo'>View Info</label><label class='dropdown-item text-white txtGroup'>Send Message</label><label class='dropdown-item text-white removeAdmin'>Dismiss as Admin</label><label class='dropdown-item text-white removefromGroup'>Remove from Group</label></div></div>";
															}
															else
															{
																options="<div class='dropdown' style='float:right;position:relative;margin-top:-15px;'><button type='button' class='btn btn-dark dropdown-toggle dropdown-toggle-split' data-toggle='dropdown'></button><div class='dropdown-menu bg-dark' style='line-height:25px;'><label class='dropdown-item text-white viewInfo'>View Info</label><label class='dropdown-item text-white txtGroup'>Send Message</label><label class='dropdown-item text-white addAdmin'>Make Group Admin</label><label class='dropdown-item text-white removefromGroup'>Remove from Group</label></div></div>";
															}
														}
														else
														{
															options="<div class='dropdown' style='float:right;position:relative;margin-top:-15px;'><button type='button' class='btn btn-dark dropdown-toggle dropdown-toggle-split' data-toggle='dropdown'></button><div class='dropdown-menu bg-dark' style='line-height:25px;'><label class='dropdown-item text-white viewInfo'>View Info</label><label class='dropdown-item text-white txtGroup'>Send Message</label></div></div>";							
														}
														for(var v=3; v<$("table.groupTable tr").length; v++)
														{
															if($(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(1)").text()==$("table.groupTable tr:eq("+v+") td label:eq(1)").text())
															{
																break;
															}
														}
														if($(".g"+r).find("#members").children("label:eq("+a[z]+")").hasClass("admin"))
														{
															var mem="<td style='border-top:none !important;' class='admin'>"+$(".g"+r).find("#members").children("label:eq("+a[z]+")").html()+options+"<em class='badge badge-pill badge-light' style='float:right;position:static;margin:-45px -20px 0px 0px;'>Admin</em></td>";
															$("table.groupTable tr:eq("+v+")").html(mem);
														}
														else
														{
															var mem="<td style='border-top:none !important;'>"+$(".g"+r).find("#members").children("label:eq("+a[z]+")").html()+options+"</td>";
															$("table.groupTable tr:eq("+v+")").html(mem);
														}
													}
												}

												if($(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(0)").css("display")!="none")
												{
													groupNames=groupNames+$(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(0)").text()+", ";
												}
												else
												{
													groupNames=groupNames+$(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(1)").text()+", ";
												}
											}
											if($(".g"+r).parent().hasClass("bg-active"))
											{
												groupNames=groupNames.slice(0,groupNames.length-2);
												if(groupNames.length>70)
												{
													groupNames=groupNames.slice(0,70)+"...";
												}
												$("div.txt div label label:eq(1)").text(groupNames);
											}
										}
									}

									if($("table:eq(1) tr th.u"+(countu+1)).parent().hasClass("bg-active"))
									{
										$("div.txt div label label:eq(0)").css("font-size","21px").text($("table:eq(1) tr th.u"+(countu+1)).find("label:eq(0)").text());

										$("div.profile").find("table:eq(0) tr td h2").css("font-size","25px").text($("table:eq(1) tr th.u"+(countu+1)).find("label:eq(0)").text());
										$("div.profile").find("table:eq(0) tr td label").text($("table:eq(1) tr th.u"+(countu+1)).find("label:eq(2)").text());

										$("button.saveCI").hide();
										$("button.deleteContact").text("Delete Contact");

										$("div.txt").attr("data-active","u"+(countu+1));
										$("div.profile").attr("data-active","u"+(countu+1));
									}

									$("div#newContact").modal("toggle");
								}
								else if($("span.updates").attr("data-updating")==1)
								{
									$("div#newContact").find("span.bg-warning").text("Please just wait a few seconds.").fadeIn(1500);
									setTimeout(function(){$("div#newContact").find("span.bg-warning").fadeOut(1500);},5000);
								}
							}
						}
						else
						{
							if(name!="" && about!="" && contact!="" && contact.length==10 && $("span.updates").attr("data-updating")==0)
							{
								$("div#newContact").modal("toggle");

								var n=name;
								var len=n.length;
								if(len>11)
								{
									len=11;
									n=n.slice(0,11);
								}
								if(n.indexOf(" ")!=-1)
								{
									len=n.indexOf(" ");
								}

								name=n.slice(0,len);

								var size=countu+1;
								var imgsrc=$("div#newContact").find("img").attr("src");
								contact="+91 "+contact.slice(0,5)+" "+contact.slice(5,10);

								$("table:eq(1)").append("<tr style='cursor:pointer;'><th class=u"+size+"><img class='rounded-circle' src="+imgsrc+" height='50' width='45' style='object-fit:cover;'>&nbsp;&nbsp;<label style='font-size:17px;'>"+name+"</label><label style='display:none;'>"+about+"</label><label style='display:none;font-size:16px;'>"+contact+"</label><div style='position:relative;margin-top:-15px;margin-left:55px;height:15px;width:180px;font-size:12px;font-weight:normal;color:lightgrey;'></div><span class='badge badge-pill mt-n4' style='font-size:10px;float:right;'></span></th></tr>");

								$("div.txt div:eq(0)").append("<div class='badge badge-pill badge-success status statusu"+size+"' style='width:100px;'>Active Now</div>");

								$("div.msgu"+(size-1)).after("<div class='list-group msg msgu"+size+"' style='width:100%;height:522px;overflow:auto;display:none;' data-predefined-txts='4' data-running=0 data-updating=0><div class='list-group-item bg-dark text-white' style='border-radius:10px;display:none;width:175px;margin:10px 0px 10px 6px;'><label style='margin-bottom:-3px !important;padding-bottom:-3px !important;'>Hey! This is "+name+".I was added to your contacts and then being texted.</label></div><div class='list-group-item bg-dark text-white' style='border-radius:10px;display:none;width:160px;margin:10px 0px 10px 6px;'><label style='margin-bottom:-3px !important;padding-bottom:-3px !important;'>🥺🥺🥺</label></div></div><div class='list-group-item bg-dark text-white' style='border-radius:10px;display:none;width:170px;margin:10px 0px 10px 6px;'><label style='margin-bottom:-3px !important;padding-bottom:-3px !important;'>Itni perfection ke saath Testing 🥺</label></div><div class='list-group-item bg-dark text-white' style='border-radius:10px;display:none;width:160px;margin:10px 0px 10px 6px;'><label style='margin-bottom:-3px !important;padding-bottom:-3px !important;'>Sexy 🔥🔥</label></div></div>");

								$("table:eq(1) tr th.u"+size).parent().click();
            					var offset = $("table:eq(1) tr th.u"+size).parent().offset().top - $('div.chat-thread').scrollTop();

    							if(offset > $('div.chat-thread').innerHeight())
    							{
        							$('div.chat-thread').animate({scrollTop: offset}, 2000);
    							}

    							var countg=0;
								for(var l=0; l<=$("table:eq(1) tr").length-1; l++)
								{
									if($("table:eq(1) tr:eq("+l+") th").attr("class").charAt(0)=='g')
									{
										if(countg==0)
										{
											countg=$("table:eq(1) tr:eq("+l+") th").attr("class").slice(1)-0;
										}
										else
										{
											if($("table:eq(1) tr:eq("+l+") th").attr("class").slice(1)-0 > countg)
											{
												countg=$("table:eq(1) tr:eq("+l+") th").attr("class").slice(1)-0;
											}
										}
									}
								}
								for(var r=1; r<=countg; r++)
								{
									if($(".g"+r).length==1)
									{
										var par=$(".g"+r).find("#members").children().length;

										var a=[];
											var b=[];
											var an=[];
											var bn=[];
											for(var k=0; k<par; k++)
											{
												if($(".g"+r).find("#members").children("label:eq("+k+")").children("label:eq(0)").css("display")!="none")
												{
												an.push($(".g"+r).find("#members").children("label:eq("+k+")").children("label:eq(0)").text());
												a.push(k);
												}
												else
												{
													bn.push($(".g"+r).find("#members").children("label:eq("+k+")").children("label:eq(1)").text());
													b.push(k)
												}
											}
											for(var k=0; k<an.length-1; k++)
											{
												for(var l=0; l<an.length-k-1; l++)
												{
													if(an[l].localeCompare(an[l+1]) > 0)
													{
														var temp=an[l];
														an[l]=an[l+1];
														an[l+1]=temp;

														temp=a[l];
														a[l]=a[l+1];
														a[l+1]=temp;
													}
												}
											}
											for(var k=0; k<bn.length-1; k++)
											{
												for(var l=0; l<bn.length-k-1; l++)
												{
													if(bn[l].localeCompare(bn[l+1]) > 0)
													{
														var temp=bn[l];
														bn[l]=bn[l+1];
														bn[l+1]=temp;

														temp=b[l];
														b[l]=b[l+1];
														b[l+1]=temp;
													}
												}
											}
											a=a.concat(b);

										for(var z=0; z<par; z++)
										{
											if($(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(1)").text()==contact)
											{
												$(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(0)").css({"display":"block","margin":"-40px 0px 0px 60px"});
												$(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(1)").css({"display":"none"});
												$(".g"+r).find("#members").children("label:eq("+a[z]+")").children("label:eq(2)").css({"margin-top":"-25px"});
											}
										}
									}
								}
							}
							else if($("span.updates").attr("data-updating")==1)
							{
								$("div#newContact").find("span.bg-warning").text("Please just wait a few seconds").fadeIn(1500);
								setTimeout(function(){$("div#newContact").find("span.bg-warning").fadeOut(1500);},5000);
							}
						}
					}
				});
				$("div#newContact").on("hidden.bs.modal", function()
				{
					$("table.savecontact").find("input:eq(0)").val("");
					$("table.savecontact").find("input:eq(1)").val("");
					$("table.savecontact").find("input:eq(2)").val("");
					$("div#newContact").find("img").attr("src","https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg");
				});
				$(".dropdown-menu input:eq(0)").on("change", function()
				{
					var fileInput = document.getElementById('uImg'); 
            		var filePath = fileInput.value; 
					var allowedExtensions =/(\.jpg|\.jpeg|\.png|\.gif)$/i; 
					if(allowedExtensions.exec(filePath))
					{
						$("#newUploadImage").show();
						document.getElementById('newUploadImage').src = window.URL.createObjectURL(this.files[0]);
						$("#newUploadVideo").hide();
					}
					else
					{
						$("#newUploadVideo").show();
						document.getElementById('newUploadVideo').src = window.URL.createObjectURL(this.files[0]);
						$("#newUploadImage").hide();
					}

					$("#addMedia").modal("show");
					$("#addMedia").find("input").val($("input[placeholder='Type a message']").val());
					$("input[placeholder='Type a message']").val("")

					$(".dropdown-menu input:eq(0)").val("");
				});
				$("#addMedia").on("hidden.bs.modal", function()
				{
					setTimeout(function(){
						document.getElementById('newUploadImage').src = "";
    					document.getElementById('newUploadVideo').src = "";
    				},10);
				});
				$("video").on("play",function(e)
				{
					var $allVideos = $('video');
					$allVideos.not(this).each(function() 
					{
    					this.pause();
    				});
				});
				$("input.searchCC").on("keyup", function() 
				{
    				var value = $(this).val().toLowerCase();
    				$("table.tableCC tr").filter(function() 
    				{
      					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    				});
 				 });
				$("div.txt").find("div.dropdown-menu label:eq(2)").click(function()
				{
					$("#shareContact").modal("show");

					var countu=0;
					for(var m=0; m<=$("table:eq(1) tr").length-1; m++)
					{
						if($("table:eq(1) tr:eq("+m+") th").attr("class").charAt(0)=='u')
						{
							if(countu==0)
							{
								countu=$("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0;
							}
							else
							{
								if($("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0 > countu)
								{
									countu=$("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0;
								}
							}
						}
					}

					for(var i=1; i<=countu; i++)
					{
						if($(".u"+i).length==1)
						{
							var img="<img class='rounded-circle' src="+$("table:eq(1) tr th.u"+i+" img").attr("src")+" height='60' width='53' style='object-fit:cover;'>";
							var name="&nbsp;&nbsp;<label style='font-size:19px'>"+$("table:eq(1) tr th.u"+i+" label:eq(0)").text()+"</label>";
							var about="<label style='display:none;'>"+$("table:eq(1) tr th.u"+i+" label:eq(1)").text()+"</label>";
							var contact="<br><div style='margin:-20px 0px 0px 60px;font-size:13.9px;font-weight:normal'>"+$("table:eq(1) tr th.u"+i+" label:eq(2)").text()+"</div>";
							$("#shareContact").find("table").append("<tr><th style='border-top:none !important;'>"+img+name+"<i class='fa fa-send-o mt-3 selectcontact'  style='float:right;font-size:20px'></i>"+about+contact+"</th></tr>");
						}
					}

					for(var k=0; k<$("#shareContact").find("table tr").length-1; k++)
					{
						for(var l=0; l<$("#shareContact").find("table tr").length-k-1; l++)
						{
							if($("#shareContact").find("table tr:eq("+l+") label:eq(0)").text().localeCompare($("#shareContact").find("table tr:eq("+(l+1)+") label:eq(0)").text()) > 0)
							{
								var a=$("#shareContact").find("table tr:eq("+l+")").html();
								$("#shareContact").find("table tr:eq("+l+")").html($("#shareContact").find("table tr:eq("+(l+1)+")").html());
								$("#shareContact").find("table tr:eq("+(l+1)+")").html(a);
							}
						}
					}
				});
				$("#shareContact").on("hidden.bs.modal", function()
				{
					$("#shareContact").find("table").empty();
					$(".selectcontact").show();
					$("#shareContact").find(".modal-content").css("height","530px");
					$("#shareContact").find(".row:eq(1)").show();
					$("#shareContact").find(".row:eq(2)").css("height","378px");
					$(".contactform").hide();
				});
				$("body").on("click",".selectcontact",function(event)
				{
					$(event.target).parent().parent().siblings().remove();
					$(".selectcontact").hide();
					$("#shareContact").find(".modal-content").animate({height:"225px"},1000);
					$("#shareContact").find(".row:eq(1)").fadeOut(200);
					$("#shareContact").find(".row:eq(2)").css("height","95px");
					$(".contactform").fadeIn(1000);

					$("input[placeholder='Tell something about this person']").val($("input[placeholder='Type a message']").val());
					$("input[placeholder='Type a message']").val("");
				});
				$(".dropdown-menu input:eq(1)").on("change", function(e)
				{
					var fileInput = document.getElementById('uDoc'); 
            		var filePath = fileInput.value;
            		var fileName = e.target.files[0].name;
					var fileURL = window.URL.createObjectURL(this.files[0]);

					if(fileName.length<=25)
					{
						$(".docName").html("<a href='#' target='_blank' style='text-decoration:none;color:white;'>"+fileName+"</a>");
					}
					else
					{
            			$(".docName").html("<a href='#' target='_blank' style='text-decoration:none;color:white;'>"+fileName.slice(0,20)+"...pdf</a>");
					}
            		$("#shareDocument").find("a").attr("href",fileURL);
            		$("#shareDocument").find("a").attr("data-name",fileName);

            		$("#shareDocument").modal("show");
					$("#shareDocument").find("input").val($("input[placeholder='Type a message']").val());
					$("input[placeholder='Type a message']").val("")

					$(".dropdown-menu input:eq(1)").val("");
            	});
            	$("body").on("click","span.saveCC",function(event)
            	{
            		$("div#newContact").find("img").attr("src",$(event.target).siblings("img").attr("src"));
            		$("table.savecontact").find("input:eq(0)").val($(event.target).siblings("label:eq(0)").text());
					$("table.savecontact").find("input:eq(1)").val($(event.target).siblings("label:eq(1)").text());
					$("table.savecontact").find("input:eq(2)").val($(event.target).siblings("label:eq(2)").text().slice(4,9)+$(event.target).siblings("label:eq(2)").text().slice(10,15)-0);

					$("div#newContact").modal("show");
            	});
            	$("body").on("click","button.saveCI",function(event)
            	{
            		$("div#newContact").find("img").attr("src",$(event.target).siblings("div").children("img").attr("src"));
            		$("table.savecontact").find("input:eq(0)").val($(event.target).siblings("table.info").find("tr td label").text().slice(2));
					$("table.savecontact").find("input:eq(1)").val($(event.target).siblings("table.info").find("tr td h4").text());
					$("table.savecontact").find("input:eq(2)").val($(event.target).siblings("table.info").find("tr td h2").text().slice(4,9)+$(event.target).siblings("table.info").find("tr td h2").text().slice(10,15)-0);

					$("div#newContact").modal("show");
            	});
            	$("body").on("click","span.txtCC",function(event)
            	{
            		var countu=0;
					for(var m=0; m<=$("table:eq(1) tr").length-1; m++)
					{
						if($("table:eq(1) tr:eq("+m+") th").attr("class").charAt(0)=='u')
						{
							if(countu==0)
							{
								countu=$("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0;
							}
							else
							{
								if($("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0 > countu)
								{
									countu=$("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0;
								}
							}
						}
					}

					var flagu=0;
					var contact=$(event.target).siblings("label:eq(2)").text();
					for(var i=1; i<=countu; i++)
					{
						if($("table:eq(1) tr th.u"+i+" label:eq(2)").text()===contact)
						{
							flagu=1;
							break;
						}
					}

					if(flagu==1)
					{
						$("table:eq(1) tr th.u"+i).parent().click();
						var offset = $("table:eq(1) tr th.u"+i).parent().offset().top - $('div.chat-thread').scrollTop();

    					if(offset > $('div.chat-thread').innerHeight())
    					{
        					$('div.chat-thread').animate({scrollTop: offset}, 2000);
    					}
					}
					else
					{
						var countk=0;
						for(var n=0; n<=$("table:eq(1) tr").length-1; n++)
						{
							if($("table:eq(1) tr:eq("+n+") th").attr("class").charAt(0)=='k')
							{
								if(countk==0)
								{
									countk=$("table:eq(1) tr:eq("+n+") th").attr("class").slice(1)-0;
								}
								else
								{
									if($("table:eq(1) tr:eq("+n+") th").attr("class").slice(1)-0 > countk)
									{
										countk=$("table:eq(1) tr:eq("+n+") th").attr("class").slice(1)-0;
									}
								}
							}
						}

						var flagk=0;
						for(var j=1; j<=countk; j++)
						{
							if($("table:eq(1) tr th.k"+j+" label:eq(2)").text()===contact)
							{
								flagk=1;
								break;
							}
						}
						if(flagk==1)
						{
							$("table:eq(1) tr th.k"+j).parent().click();
							var offset = $("table:eq(1) tr th.k"+j).parent().offset().top - $('div.chat-thread').scrollTop();

    						if(offset > $('div.chat-thread').innerHeight())
    						{
        						$('div.chat-thread').animate({scrollTop: offset}, 2000);
    						}
						}
						else
						{
							var size=countk+1;
							var imgsrc=$(event.target).siblings("img").attr("src");
							var name=$(event.target).siblings("label:eq(0)").text();
							var about=$(event.target).siblings("label:eq(1)").text();

            				$("table:eq(1) tr:eq(0)").after("<tr style='cursor:pointer;'><th class=k"+size+"><img class='rounded-circle' src="+imgsrc+" height='50' width='45' style='object-fit:cover;'>&nbsp;&nbsp;<label style='display:none;font-size:17px;'>"+name+"</label><label style='display:none;'>"+about+"</label><label style='font-size:16px;'>"+contact+"</label><div style='position:relative;margin-top:-15px;margin-left:55px;height:15px;width:180px;font-size:12px;font-weight:normal;color:lightgrey;'></div><span class='badge badge-pill mt-n4' style='font-size:10px;float:right;'></span></th></tr>");

            				$("div.txt div:eq(0)").append("<div class='badge badge-pill badge-success status statusk"+size+"' style='width:100px;'>Active Now</div>");

							$("div.txt form").before("<div class='list-group msg msgk"+size+"' style='width:100%;height:522px;overflow:auto;display:none;' data-predefined-txts='4' data-running=0 data-updating=0><div class='list-group-item bg-dark text-white' style='border-radius:10px;display:none;width:175px;margin:10px 0px 10px 6px;'><label style='margin-bottom:-3px !important;padding-bottom:-3px !important;'>Hii! This is "+name+". I am being texted through a Contact Card.</label></div><div class='list-group-item bg-dark text-white' style='border-radius:10px 10px 5px 5px;display:none;margin:10px 0px 10px 10px;width:260px;'><video style='height:280px;width:260px;border-radius:10px 10px 1px 1px;margin:-13px 0px -10px -21px;object-fit:cover;' src='E:\\Guriqbal\\All\\Chitkara\\ULSW9247.MP4' controls></video><label style='margin-bottom:-11px;padding:12px 0px 5px 0px;'>Yaar hassi ni rukk rahi 🤣🤣</label></div><div class='list-group-item bg-dark text-white' style='border-radius:10px;display:none;width:160px;margin:10px 0px 10px 6px;'><label style='margin-bottom:-3px !important;padding-bottom:-3px !important;'>Testing yaar 👌</label></div><div class='list-group-item bg-dark text-white' style='border-radius:10px;display:none;width:160px;margin:10px 0px 10px 6px;'><label style='margin-bottom:-3px !important;padding-bottom:-3px !important;'>😁😜</label></div></div>");

            				$("table:eq(1) tr th.k"+size).parent().click();
            				$("div.chat-thread").animate({scrollTop: 0}, 2000);
            			}
            		}
            	});
            	$("button.clearChat").on("click",function()
            	{
            		var t=$("div.profile").attr("data-active");
            		var r=$("div.msg"+t).attr("data-running");

            		if(r==1)
            		{
            			var hide=0;
            			var j=$("div.msg"+t).data("count");
            			for(var h=0; h<j; h++)
            			{
            				if($("div.msg"+t+" div:eq("+h+")").css("display")!="none")
            				{
            					hide=1;
            					$("div.msg"+t+" div:eq("+h+")").hide(300);

            					if($("div.msg"+t+" div:eq("+h+")").find("img").length==1 && $("div.msg"+t+" div:eq("+h+")").find("label").length==1)
								{
									$("div.msg"+t).data("photo",$("div.msg"+t).data("photo")-0-1);
									if(($("div.msg"+t).data("photo")-0)<0)
									{
										$("div.msg"+t).data("photo",0);
									}
								}
								else if($("div.msg"+t+" div:eq("+h+")").find("video").length==1 && $("div.msg"+t+" div:eq("+h+")").find("label").length==1)
								{
									$("div.msg"+t).data("video",$("div.msg"+t).data("video")-0-1);
									if(($("div.msg"+t).data("video")-0)<0)
									{
										$("div.msg"+t).data("video",0);
									}
								}
								else if($("div.msg"+t+" div:eq("+h+")").find("img").length==1 && $("div.msg"+t+" div:eq("+h+")").find("label").length==4)
								{
									$("div.msg"+t).data("ccard",$("div.msg"+t).data("ccard")-0-1);
									if(($("div.msg"+t).data("ccard")-0)<0)
									{
										$("div.msg"+t).data("ccard",0);
									}
								}
								else if($("div.msg"+t+" div:eq("+h+")").find("a").length==1 && $("div.msg"+t+" div:eq("+h+")").find("label").length==1)
								{
									$("div.msg"+t).data("docum",$("div.msg"+t).data("docum")-0-1);
									if(($("div.msg"+t).data("docum")-0)<0)
									{
										$("div.msg"+t).data("docum",0);
									}
								}
								else
								{
									$("div.msg"+t).data("tonly",$("div.msg"+t).data("tonly")-0-1);
									if(($("div.msg"+t).data("tonly")-0)<0)
									{
										$("div.msg"+t).data("tonly",0);
									}
								}
							}
            			}
						var p=$("div.msg"+t).data("photo")-0;
						var v=$("div.msg"+t).data("video")-0;
						$("table.stats tr:eq(0) td label:eq(1)").text(p+v);
						$("table.stats tr:eq(1) td label:eq(1)").text($("div.msg"+t).data("docum"));
						$("table.stats tr:eq(2) td label:eq(1)").text($("div.msg"+t).data("ccard"));
						$("table.stats tr:eq(3) td label:eq(1)").text($("div.msg"+t).data("tonly"));
							
            			$("th."+t+" div").text("");
            			$("div.msg"+t+" .txtstatus").hide(300);

            			if(hide==1)
            			{
            				$("div.profile").find("span.bt").removeClass("bg-warning").addClass("bg-success").text("Chat cleared Successfully").fadeIn(1500);
							setTimeout(function(){$("div.profile").find("span.bt").removeClass("bg-warning").addClass("bg-success").text("Chat cleared Successfully").fadeOut(1500);},5000);
						}
						else
						{
							$("div.profile").find("span.bt").removeClass("bg-warning").addClass("bg-success").text("No Chat to Clear").fadeIn(1500);
							setTimeout(function(){$("div.profile").find("span.bt").removeClass("bg-warning").addClass("bg-success").text("No Chat to Clear").fadeOut(1500);},5000);
						}
            		}
            		else
            		{
            			if($("div.msg"+t).children().length==$("div.msg"+t).attr("data-predefined-txts"))
            			{
            				$("div.profile").find("span.bt").removeClass("bg-warning").addClass("bg-success").text("No Chat to Clear").fadeIn(1500);
							setTimeout(function(){$("div.profile").find("span.bt").removeClass("bg-warning").addClass("bg-success").text("No Chat to Clear").fadeOut(1500);},5000);
            			}
            			else
            			{
            				$("div.msg"+t).children().hide("slow",function()
            				{
            					$("div.msg"+t).children(".myTxt").remove();
            					$("th."+t+" div").text("");

            					$("div.msg"+t).data("count",0);
            					$("div.msg"+t).data("photo",0);
								$("div.msg"+t).data("video",0);
								$("div.msg"+t).data("docum",0);
					    		$("div.msg"+t).data("ccard",0);
								$("div.msg"+t).data("tonly",0);

								$("table.stats tr:eq(0) td label:eq(1)").text(0);
								$("table.stats tr:eq(1) td label:eq(1)").text(0);
								$("table.stats tr:eq(2) td label:eq(1)").text(0);
								$("table.stats tr:eq(3) td label:eq(1)").text(0);

								$("div.profile").find("span.bt").removeClass("bg-warning").addClass("bg-success").text("Chat cleared Successfully").fadeIn(1500);
								setTimeout(function(){$("div.profile").find("span.bt").removeClass("bg-warning").addClass("bg-success").text("Chat cleared Successfully").fadeOut(1500);},5000);
            				});
            			}
            		}
            	});
            	$("button.deleteContact").on("click",function()
            	{
            		var t=$("div.profile").attr("data-active");
            		var r=$("div.msg"+t).attr("data-running");

            		var contact=$("."+t).find("label:eq(2)").text();

            		if(t.charAt(0)=='u')
            		{
            			var countk=0;
						for(var n=0; n<=$("table:eq(1) tr").length-1; n++)
						{
							if($("table:eq(1) tr:eq("+n+") th").attr("class").charAt(0)=='k')
							{
								if(countk==0)
								{
									countk=$("table:eq(1) tr:eq("+n+") th").attr("class").slice(1)-0;
								}
								else
								{
									if($("table:eq(1) tr:eq("+n+") th").attr("class").slice(1)-0 > countk)
									{
										countk=$("table:eq(1) tr:eq("+n+") th").attr("class").slice(1)-0;
									}
								}
							}
						}

            			if(r==1)
            			{
            				if($("div.msg"+t).attr("data-updating")==0)
            				{
            					$("table:eq(1) tr th."+t).find("label:eq(0)").css({"display":"none","font-size":"17px"});
								$("table:eq(1) tr th."+t).find("label:eq(2)").css({"display":"block","font-size":"16px","margin":"-35px 0px 18px 55px"});

									var countg=0;
									for(var l=0; l<=$("table:eq(1) tr").length-1; l++)
									{
										if($("table:eq(1) tr:eq("+l+") th").attr("class").charAt(0)=='g')
										{
											if(countg==0)
											{
												countg=$("table:eq(1) tr:eq("+l+") th").attr("class").slice(1)-0;
											}
											else
											{
												if($("table:eq(1) tr:eq("+l+") th").attr("class").slice(1)-0 > countg)
												{
													countg=$("table:eq(1) tr:eq("+l+") th").attr("class").slice(1)-0;
												}
											}
										}
									}

									for(var r=1; r<=countg; r++)
									{
										if($(".g"+r).length==1)
										{
											var par=$(".g"+r).find("#members").children().length;
											for(var z=0; z<par; z++)
											{
												if($(".g"+r).find("#members").children("label:eq("+z+")").children("label:eq(1)").text()==contact)
												{
													$(".g"+r).find("#members").children("label:eq("+z+")").children("label:eq(0)").css({"display":"none","margin":""});
													$(".g"+r).find("#members").children("label:eq("+z+")").children("label:eq(1)").css({"display":"block","margin":"-40px 0px 0px 56px"});
													$(".g"+r).find("#members").children("label:eq("+z+")").children("label:eq(2)").css({"margin-top":"-5px"});
												}
											}
										}
									}

								$("div.txt div label label:eq(0)").css("font-size","17px").text($("table:eq(1) tr th."+t).find("label:eq(2)").text());

								$("div.profile").find("table:eq(0) tr td h2").css("font-size","21px").text($("table:eq(1) tr th."+t).find("label:eq(2)").text());
								$("div.profile").find("table:eq(0) tr td label").text("~ "+$("table:eq(1) tr th."+t).find("label:eq(0)").text());

								$("button.saveCI").show();
								$("button.deleteContact").text("Delete Chat");

								$("span.updates").attr("data-updating",1).fadeIn(700);
								$("div.msg"+t).attr("data-updating",1);

								$("div.msg"+t).attr("data-updating-id",setTimeout(function()
								{
									$("table:eq(1) tr th."+t).addClass("k"+(countk+1)).removeClass(t);
									$("div.status"+t).addClass("statusk"+(countk+1)).removeClass("status"+t);
									$("div.msg"+t).addClass("msgk"+(countk+1)).removeClass("msg"+t);

									if($("table:eq(1) tr th.k"+(countk+1)).parent().hasClass("bg-active"))
									{
										$("div.txt").attr("data-active","k"+(countk+1));
										$("div.profile").attr("data-active","k"+(countk+1));
									}

									$("span.updates").attr("data-updating",0).fadeOut(700);
									$("div.msg"+t).attr("data-updating",0);
									$("div.msgk"+(countk+1)).attr("data-updating",0);
								},14500));
            				}
            				else
            				{
            					$("div.txt,div.profile").hide("slow");
            					$("table:eq(1) tr th."+t).parent().removeClass("bg-active").hide();
            					$("button.clearChat").click();
            					setTimeout(function()
            					{
            						$("div.txt").attr("data-active","");
            						$("div.profile").attr("data-active","");
            					},10);
            				}
     					}
     					else
            			{
            				if($("div.msg"+t).attr("data-updating")==0)
            				{
            					$("table:eq(1) tr th."+t).addClass("k"+(countk+1)).removeClass(t);
								$("div.status"+t).addClass("statusk"+(countk+1)).removeClass("status"+t);
								$("div.msg"+t).addClass("msgk"+(countk+1)).removeClass("msg"+t);

								$("table:eq(1) tr th.k"+(countk+1)).find("label:eq(0)").css({"display":"none","font-size":"17px"});
								$("table:eq(1) tr th.k"+(countk+1)).find("label:eq(2)").css({"display":"block","font-size":"16px","margin":"-35px 0px 18px 55px"});

									var countg=0;
									for(var l=0; l<=$("table:eq(1) tr").length-1; l++)
									{
										if($("table:eq(1) tr:eq("+l+") th").attr("class").charAt(0)=='g')
										{
											if(countg==0)
											{
												countg=$("table:eq(1) tr:eq("+l+") th").attr("class").slice(1)-0;
											}
											else
											{
												if($("table:eq(1) tr:eq("+l+") th").attr("class").slice(1)-0 > countg)
												{
													countg=$("table:eq(1) tr:eq("+l+") th").attr("class").slice(1)-0;
												}
											}
										}
									}

									for(var r=1; r<=countg; r++)
									{
										if($(".g"+r).length==1)
										{
											var par=$(".g"+r).find("#members").children().length;
											for(z=0; z<par; z++)
											{
												if($(".g"+r).find("#members").children("label:eq("+z+")").children("label:eq(1)").text()==contact)
												{
													$(".g"+r).find("#members").children("label:eq("+z+")").children("label:eq(0)").css({"display":"none","margin":""});
													$(".g"+r).find("#members").children("label:eq("+z+")").children("label:eq(1)").css({"display":"block","margin":"-40px 0px 0px 56px"});
													$(".g"+r).find("#members").children("label:eq("+z+")").children("label:eq(2)").css({"margin-top":"-5px"});
												}
											}
										}
									}

								$("div.txt div label label:eq(0)").css("font-size","17px").text($("table:eq(1) tr th.k"+(countk+1)).find("label:eq(2)").text());

								$("div.profile").find("table:eq(0) tr td h2").css("font-size","21px").text($("table:eq(1) tr th.k"+(countk+1)).find("label:eq(2)").text());
								$("div.profile").find("table:eq(0) tr td label").text("~ "+$("table:eq(1) tr th.k"+(countk+1)).find("label:eq(0)").text());

								$("button.saveCI").show();
								$("button.deleteContact").text("Delete Chat");

								$("div.txt").attr("data-active","k"+(countk+1));
								$("div.profile").attr("data-active","k"+(countk+1));
							}
							else
							{
								$("div.txt,div.profile").hide("slow");
            					$("table:eq(1) tr th."+t).parent().removeClass("bg-active").hide();
            					$("button.clearChat").click();
            					setTimeout(function()
            					{
            						$("div.txt").attr("data-active","");
            						$("div.profile").attr("data-active","");
            					},10);
							}
            			}
            		}
            		else if(t.charAt(0)=='k')
            		{
            			if(r==1)
            			{
            				if($("div.msg"+t).attr("data-updating")==0)
            				{
            					$("div.txt,div.profile").hide("slow");
            					$("table:eq(1) tr th."+t).parent().removeClass("bg-active").hide();
            					$("button.clearChat").click();
            					setTimeout(function()
            					{
            						$("div.txt").attr("data-active","");
            						$("div.profile").attr("data-active","");
            					},10);
            				}
            				else
            				{
            					$("div.profile").find("span.bt").removeClass("bg-success").addClass("bg-warning").text("Please just wait a few seconds.").fadeIn(1500);
								setTimeout(function(){$("div.profile").find("span.bt").removeClass("bg-success").addClass("bg-warning").text("Please just wait a few seconds.").fadeOut(1500);},5000);
            				}
            			}
            			else
            			{
            				if($("div.msg"+t).attr("data-updating")==0)
            				{
            					$("button.clearChat").click();
            					setTimeout(function(){$("div.txt div i:eq(0)").click();},100);
            				}
            				else
            				{
            					$("div.profile").find("span.bt").removeClass("bg-success").addClass("bg-warning").text("Please just wait a few seconds.").fadeIn(1500);
								setTimeout(function(){$("div.profile").find("span.bt").removeClass("bg-success").addClass("bg-warning").text("Please just wait a few seconds.").fadeOut(1500);},5000);
            				}
            			}
            		}
            		else
            		{
            			var ad=$("table.groupTable tr:gt(2)").find(".admin").length;
            			if(ad==0)
            			{
            				$("div.profile").find("span.bt").removeClass("bg-success").addClass("bg-warning").text("Make somebody as Admin").fadeIn(1500);
							setTimeout(function(){$("div.profile").find("span.bt").removeClass("bg-success").addClass("bg-warning").text("Make somebody as Admin").fadeOut(1500);},5000);
            			}
            			else
            			{
            				$("div.txt,div.profile").hide("slow");
            				$("table:eq(1) tr th."+t).parent().removeClass("bg-active").hide();
            				if($(".UserName").attr("data-adminControls").indexOf(t)!=-1)
            				{
            					var h=$(".UserName").attr("data-adminControls").indexOf(t);
            					var n=$(".UserName").attr("data-adminControls");
            					n=n.slice(0,h)+n.slice(h+t.length);
            					$(".UserName").attr("data-adminControls",n);
            				}
            				$("button.clearChat").click();
            				setTimeout(function()
            				{
            					$("div.txt").attr("data-active","");
            					$("div.profile").attr("data-active","");
            				},10);
            			}
            		}
            	});
				document.querySelector('#rating').addEventListener('click', function (e) 
				{
    				let action = 'add';
    				for (const span of this.children) 
    				{
        				span.classList[action]('active');
        				if (span === e.target) action = 'remove';
    				}
				});
				$("#feedback").on("hidden.bs.modal", function()
				{
					$(this).find("span").removeClass("active");
					$(this).find("textarea").val("");
					$(this).find("form").removeAttr("novalidate");
				});
				$("button.sendfeedback").click(function()
				{
					if($("#feedback").find("textarea").val()!="")
					{
						$("#feedback").find("span.bg-success").fadeIn(1500);
						setTimeout(function(){$("#feedback").find("span.bg-success").fadeOut(1500);},5000);

						$("#feedback").find("textarea").val("");
						$("#feedback").find("form").attr("novalidate",true);
						$("#feedback").find("span").removeClass("active");
					}
				});
				$("body").on("click",".viewInfo",function(event)
				{
					$(event.target).siblings(".txtGroup").click();
					setTimeout(function(){$("div.txt").find("img:eq(0)").click();},1000)
				});
				$("body").on("click",".txtGroup",function(event)
				{
					var countu=0;
					for(var m=0; m<=$("table:eq(1) tr").length-1; m++)
					{
						if($("table:eq(1) tr:eq("+m+") th").attr("class").charAt(0)=='u')
						{
							if(countu==0)
							{
								countu=$("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0;
							}
							else
							{
								if($("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0 > countu)
								{
									countu=$("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0;
								}
							}
						}
					}

					var flagu=0;
					var contact=$(event.target).parent().parent().siblings("label:eq(1)").text();
					for(var i=1; i<=countu; i++)
					{
						if($("table:eq(1) tr th.u"+i+" label:eq(2)").text()==contact)
						{
							flagu=1;
							break;
						}
					}

					if(flagu==1)
					{
						$("table:eq(1) tr th.u"+i).parent().click();
						var offset = $("table:eq(1) tr th.u"+i).parent().offset().top - $('div.chat-thread').scrollTop();

    					if(offset > $('div.chat-thread').innerHeight())
    					{
        					$('div.chat-thread').animate({scrollTop: offset}, 2000);
    					}
					}
					else
					{
						var countk=0;
						for(var n=0; n<=$("table:eq(1) tr").length-1; n++)
						{
							if($("table:eq(1) tr:eq("+n+") th").attr("class").charAt(0)=='k')
							{
								if(countk==0)
								{
									countk=$("table:eq(1) tr:eq("+n+") th").attr("class").slice(1)-0;
								}
								else
								{
									if($("table:eq(1) tr:eq("+n+") th").attr("class").slice(1)-0 > countk)
									{
										countk=$("table:eq(1) tr:eq("+n+") th").attr("class").slice(1)-0;
									}
								}
							}
						}

						var flagk=0;
						for(var j=1; j<=countk; j++)
						{
							if($("table:eq(1) tr th.k"+j+" label:eq(2)").text()===contact)
							{
								flagk=1;
								break;
							}
						}
						if(flagk==1)
						{
							$("table:eq(1) tr th.k"+j).parent().click();
							var offset = $("table:eq(1) tr th.k"+j).parent().offset().top - $('div.chat-thread').scrollTop();

    						if(offset > $('div.chat-thread').innerHeight())
    						{
        						$('div.chat-thread').animate({scrollTop: offset}, 2000);
    						}
						}
						else
						{
							var size=countk+1;
							var imgsrc=$(event.target).parent().parent().siblings("img").attr("src");
							var name=$(event.target).parent().parent().siblings("label:eq(0)").text();
							var about=$(event.target).parent().parent().siblings("label:eq(2)").text();

            				$("table:eq(1) tr:eq(0)").after("<tr style='cursor:pointer;'><th class=k"+size+"><img class='rounded-circle' src="+imgsrc+" height='50' width='45' style='object-fit:cover;'>&nbsp;&nbsp;<label style='display:none;font-size:17px;'>"+name+"</label><label style='display:none;'>"+about+"</label><label style='font-size:16px;'>"+contact+"</label><div style='position:relative;margin-top:-15px;margin-left:55px;height:15px;width:180px;font-size:12px;font-weight:normal;color:lightgrey;'></div><span class='badge badge-pill mt-n4' style='font-size:10px;float:right;'></span></th></tr>");

            				$("div.txt div:eq(0)").append("<div class='badge badge-pill badge-success status statusk"+size+"' style='width:100px;'>Active Now</div>");

							$("div.txt form").before("<div class='list-group msg msgk"+size+"' style='width:100%;height:522px;overflow:auto;display:none;' data-predefined-txts='4' data-running=0 data-updating=0><div class='list-group-item bg-dark text-white' style='border-radius:10px;display:none;width:175px;margin:10px 0px 10px 6px;'><label style='margin-bottom:-3px !important;padding-bottom:-3px !important;'>Hii! This is "+name+". I am being texted through a Group.</label></div><div class='list-group-item bg-dark text-white' style='border-radius:10px 10px 5px 5px;display:none;margin:10px 0px 10px 10px;width:260px;'><video style='height:280px;width:260px;border-radius:10px 10px 1px 1px;margin:-13px 0px -10px -21px;object-fit:cover;' src='E:\\Guriqbal\\All\\Chitkara\\ULSW9247.MP4' controls></video><label style='margin-bottom:-11px;padding:12px 0px 5px 0px;'>Yaar hassi ni rukk rahi 🤣🤣</label></div><div class='list-group-item bg-dark text-white' style='border-radius:10px;display:none;width:160px;margin:10px 0px 10px 6px;'><label style='margin-bottom:-3px !important;padding-bottom:-3px !important;'>Testing yaar 👌</label></div><div class='list-group-item bg-dark text-white' style='border-radius:10px;display:none;width:160px;margin:10px 0px 10px 6px;'><label style='margin-bottom:-3px !important;padding-bottom:-3px !important;'>😁😜</label></div></div>");

            				$("table:eq(1) tr th.k"+size).parent().click();
            				$("div.chat-thread").animate({scrollTop: 0}, 2000);
            			}
            		}
				});
				$("body").on("click",".saveGroup",function(event)
				{
					$("div#newContact").find("img").attr("src",$(event.target).parent().parent().siblings("img").attr("src"));
            		$("table.savecontact").find("input:eq(0)").val($(event.target).parent().parent().siblings("label:eq(0)").text());
					$("table.savecontact").find("input:eq(1)").val($(event.target).parent().parent().siblings("label:eq(2)").text());
					$("table.savecontact").find("input:eq(2)").val($(event.target).parent().parent().siblings("label:eq(1)").text().slice(4,9)+$(event.target).parent().parent().siblings("label:eq(1)").text().slice(10,15)-0);

					$("div#newContact").modal("show");
				});
				$("body").on("click",".addAdmin",function(event)
				{
					$(event.target).parent().parent().after("<em class='badge badge-pill badge-light' style='float:right;position:static;margin:-45px -20px 0px 0px;'>Admin</em>");
					$(event.target).addClass("removeAdmin").removeClass("addAdmin").text("Dismiss as Admin");
					$(event.target).parent().parent().parent().addClass("admin");

					var contact=$(event.target).parent().parent().siblings("label:eq(1)").text();
					var t=$("div.profile").attr("data-active");

					var par=$("."+t).find("#members").children().length;
					for(var z=0; z<par; z++)
					{
						if($("."+t).find("#members").children("label:eq("+z+")").children("label:eq(1)").text()==contact)
						{
							$("."+t).find("#members").children("label:eq("+z+")").addClass("admin");
						}
					}
				});
				$("body").on("click",".removeAdmin",function(event)
				{
					$(event.target).parent().parent().siblings("em").remove();
					$(event.target).addClass("addAdmin").removeClass("removeAdmin").text("Make Group Admin");
					$(event.target).parent().parent().parent().removeClass("admin");

					var contact=$(event.target).parent().parent().siblings("label:eq(1)").text();
					var t=$("div.profile").attr("data-active");

					var par=$("."+t).find("#members").children().length;
					for(var z=0; z<par; z++)
					{
						if($("."+t).find("#members").children("label:eq("+z+")").children("label:eq(1)").text()==contact)
						{
							$("."+t).find("#members").children("label:eq("+z+")").removeClass("admin");
						}
					}
				});
				$("body").on("click",".removefromGroup",function(event)
				{
					var contact=$(event.target).parent().parent().siblings("label:eq(1)").text();
					var t=$("div.profile").attr("data-active");

					var groupNames="";
					var par=$("."+t).find("#members").children().length;
					for(var z=0; z<par; z++)
					{
						if($("."+t).find("#members").children("label:eq("+z+")").children("label:eq(1)").text()==contact)
						{
							$("."+t).find("#members").children("label:eq("+z+")").remove();
							continue;
						}

						if($("."+t).find("#members").children("label:eq("+z+")").children("label:eq(0)").css("display")!="none")
						{
							groupNames=groupNames+$("."+t).find("#members").children("label:eq("+z+")").children("label:eq(0)").text()+", ";
						}
						else
						{
							groupNames=groupNames+$("."+t).find("#members").children("label:eq("+z+")").children("label:eq(1)").text()+", ";
						}
					}
					groupNames=groupNames.slice(0,groupNames.length-2);
					if(groupNames.length>70)
					{
						groupNames=groupNames.slice(0,70)+"...";
					}
					$("div.txt div label label:eq(1)").text(groupNames);

					$(event.target).parent().parent().parent().parent().remove();
				});
				$("table.groupTable tr:eq(0)").click(function()
				{
					$("#addMember").modal("show");

					var countu=0;
					for(var m=0; m<=$("table:eq(1) tr").length-1; m++)
					{
						if($("table:eq(1) tr:eq("+m+") th").attr("class").charAt(0)=='u')
						{
							if(countu==0)
							{
								countu=$("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0;
							}
							else
							{
								if($("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0 > countu)
								{
									countu=$("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0;
								}
							}
						}
					}

					for(var i=1; i<=countu; i++)
					{
						if($(".u"+i).length==1)
						{
							var img="<img class='rounded-circle' src="+$("table:eq(1) tr th.u"+i+" img").attr("src")+" height='60' width='53' style='object-fit:cover;'>";
							var name="&nbsp;&nbsp;<label style='font-size:19px'>"+$("table:eq(1) tr th.u"+i+" label:eq(0)").text()+"</label>";
							var about="<label style='display:none;'>"+$("table:eq(1) tr th.u"+i+" label:eq(1)").text()+"</label>";
							var contact="<br><div style='margin:-20px 0px 0px 60px;font-size:13.9px;font-weight:normal'>"+$("table:eq(1) tr th.u"+i+" label:eq(2)").text()+"</div>";

							var flag=false;
							var t=$("div.profile").attr("data-active");
							var par=$("."+t).find("#members").children().length;
							for(z=0; z<par; z++)
							{
								if($("."+t).find("#members").children("label:eq("+z+")").children("label:eq(1)").text()==$("table:eq(1) tr th.u"+i+" label:eq(2)").text())
								{
									flag=true;
								}
							}
							if(flag==true)
							{
								$(".tableMember").append("<tr><th style='padding:30px 0px 0px 50px;border-top:none !important;width:65px;'><input type='checkbox' class='form-check-input' checked disabled></th><th style='border-top:none !important;'>"+img+name+about+contact+"</th></tr>");
							}
							else
							{
								$(".tableMember").append("<tr><th style='padding:30px 0px 0px 50px;border-top:none !important;width:65px;'><input type='checkbox' class='form-check-input'></th><th style='border-top:none !important;'>"+img+name+about+contact+"</th></tr>");
							}
						}
					}

					for(var k=0; k<$(".tableMember tr").length-1; k++)
					{
						for(var l=0; l<$(".tableMember tr").length-k-1; l++)
						{
							if($(".tableMember tr:eq("+l+") label:eq(0)").text().localeCompare($(".tableMember tr:eq("+(l+1)+") label:eq(0)").text()) > 0)
							{
								var a=$(".tableMember tr:eq("+l+")").html();
								$(".tableMember tr:eq("+l+")").html($(".tableMember tr:eq("+(l+1)+")").html());
								$(".tableMember tr:eq("+(l+1)+")").html(a);
							}
						}
					}
				});
				$("#addMember").on("hidden.bs.modal", function()
				{
					$("#addMember").find("table").empty();
				});
				$("input.searchMember").on("keyup", function() 
				{
    				var value = $(this).val().toLowerCase();
    				$("table.tableMember tr").filter(function() 
    				{
      					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    				});
 				 });
				$("button.addParticipants").click(function()
				{
					var options="<div class='dropdown' style='float:right;position:relative;margin-top:-15px;'><button type='button' class='btn btn-dark dropdown-toggle dropdown-toggle-split' data-toggle='dropdown'></button><div class='dropdown-menu bg-dark' style='line-height:25px;'><label class='dropdown-item text-white viewInfo'>View Info</label><label class='dropdown-item text-white txtGroup'>Send Message</label><label class='dropdown-item text-white addAdmin'>Make Group Admin</label><label class='dropdown-item text-white removefromGroup'>Remove from Group</label></div></div>";

					var flag=false;
					for(var k=0; k<$(".tableMember tr").length; k++)
					{
						if($("table.tableMember tr:eq("+k+") th:eq(0) input").prop('checked') && $("table.tableMember tr:eq("+k+") th:eq(0) input").prop("disabled")==false)
						{
							var image=$("table.tableMember tr:eq("+k+") th:eq(1)").find("img").attr("src");
							var name=$("table.tableMember tr:eq("+k+") th:eq(1)").find("label:eq(0)").text();
							var about=$("table.tableMember tr:eq("+k+") th:eq(1)").find("label:eq(1)").text();
							var contact=$("table.tableMember tr:eq("+k+") th:eq(1)").find("div").text();

							var newMember="<label><img class='rounded-circle' src="+image+" height='50' width='45' style='object-fit:cover;'>&nbsp;&nbsp;&nbsp;<label style='font-size:18px;font-weight:bold;'>"+name+"</label><br><label style='display:none;font-size:17px;font-weight:bold;'>"+contact+"</label><label style='font-size:13px;margin-left:60px;margin-top:-20px;'>"+about+"</label></label>";

							var t=$("div.profile").attr("data-active");
							$("."+t).find("#members").append(newMember);

							var mem="<tr><td style='border-top:none !important;'>"+$("."+t).find("#members").children("label:last").html()+options+"</td></tr>";
							$("table.groupTable").append(mem);

							$("#addMember").modal("hide");
							flag=true;
						}
					}
					if(flag==false)
					{
						$("#addMember").find("span.bg-warning").fadeIn(1500);
						setTimeout(function(){$("#addMember").find("span.bg-warning").fadeOut(1500);},5000);
					}
					else
					{
						var groupNames="";
						var t=$("div.profile").attr("data-active");
						var par=$("."+t).find("#members").children().length;

						for(var z=0; z<par; z++)
						{
							if($("."+t).find("#members").children("label:eq("+z+")").children("label:eq(0)").css("display")!="none")
							{									
								groupNames=groupNames+$("."+t).find("#members").children("label:eq("+z+")").children("label:eq(0)").text()+", ";
							}
							else
							{
								groupNames=groupNames+$("."+t).find("#members").children("label:eq("+z+")").children("label:eq(1)").text()+", ";
							}
						}
						groupNames=groupNames.slice(0,groupNames.length-2);
						if(groupNames.length>70)
						{
							groupNames=groupNames.slice(0,70)+"...";
						}
						$("div.txt div label label:eq(1)").text(groupNames);
					}
				});
				$("div.txt").find(".dropdown-menu label:eq(3)").on("click",function()
				{
					$("#inviteText").modal("show");

					var countg=0;
					for(var m=0; m<=$("table:eq(1) tr").length-1; m++)
					{
						if($("table:eq(1) tr:eq("+m+") th").attr("class").charAt(0)=='g')
						{
							if(countg==0)
							{
								countg=$("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0;
							}
							else
							{
								if($("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0 > countg)
								{
									countg=$("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0;
								}
							}
						}
					}

					for(var i=1; i<=countg; i++)
					{
						if($(".g"+i).length==1 && $(".UserName").attr("data-adminControls").indexOf("g"+i)!=-1)
						{
							var img="<img class='rounded-circle' src="+$("table:eq(1) tr th.g"+i+" img").attr("src")+" height='60' width='53' style='object-fit:cover;'>";
							var name="&nbsp;&nbsp;<label style='font-size:19px'>"+$("table:eq(1) tr th.g"+i+" label:eq(0)").text()+"</label>";
							var about="<label style='display:none;'>"+$("table:eq(1) tr th.g"+i+" label:eq(1)").text()+"</label>";
							var infos="<br><div style='margin:-20px 0px 0px 60px;font-size:13.9px;font-weight:normal'>"+$("table:eq(1) tr th.g"+i+" label:eq(2)").text()+"</div>";
							$("#inviteText").find("table").append("<tr><th style='border-top:none !important;'>"+img+name+"<i class='fa fa-send-o mt-3 selectgroup'  style='float:right;font-size:20px'></i>"+about+infos+"</th></tr>");
						}
					}
				});
				$("#inviteText").on("hidden.bs.modal", function()
				{
					$("#inviteText").find("table").empty();
					$(".selectgroup").show();
					$("#inviteText").find(".modal-content").css("height","530px");
					$("#inviteText").find(".row:eq(1)").show();
					$("#inviteText").find(".row:eq(2)").css("height","378px");
					$(".Groupform").hide();
				});
				$("input.searchGroup").on("keyup", function() 
				{
    				var value = $(this).val().toLowerCase();
    				$("table.tableGroup tr").filter(function() 
    				{
      					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    				});
 				 });
				$("body").on("click",".selectgroup",function(event)
				{
					$(event.target).parent().parent().siblings().remove();
					$(".selectgroup").hide();
					$("#inviteText").find(".modal-content").animate({height:"225px"},1000);
					$("#inviteText").find(".row:eq(1)").fadeOut(200);
					$("#inviteText").find(".row:eq(2)").css("height","95px");
					$(".Groupform").fadeIn(1000);

					$("input[placeholder='Tell something about this group']").val($("input[placeholder='Type a message']").val());
					$("input[placeholder='Type a message']").val("");
				});
				$("body").on("click","span.joinGroup",function(event)
            	{
            		var countg=0;
					for(var m=0; m<=$("table:eq(1) tr").length-1; m++)
					{
						if($("table:eq(1) tr:eq("+m+") th").attr("class").charAt(0)=='g')
						{
							if(countg==0)
							{
								countg=$("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0;
							}
							else
							{
								if($("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0 > countg)
								{
									countg=$("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0;
								}
							}
						}
					}

					var flagg=0;
					var name=$(event.target).siblings("label:eq(0)").text();
					var about=$(event.target).siblings("label:eq(1)").text();
					var infos=$(event.target).siblings("label:eq(2)").text();
					for(var i=1; i<=countg; i++)
					{
						if($("table:eq(1) tr th.g"+i+" label:eq(0)").text()==name && $("table:eq(1) tr th.g"+i+" label:eq(1)").text()==about && $("table:eq(1) tr th.g"+i+" label:eq(2)").text()==infos)
						{
							flagg=1;
							break;
						}
					}

					if(flagg==1)
					{
						$("table:eq(1) tr th.g"+i).parent().click();
						if($("table:eq(1) tr th.g"+i).parent().css("display")=="none")
						{
							$("table:eq(1) tr th.g"+i).parent().show().insertBefore($("table:eq(1) tr:eq(0)"));
						}
						var offset = $("table:eq(1) tr th.g"+i).parent().offset().top - $('div.chat-thread').scrollTop();

    					if(offset > $('div.chat-thread').innerHeight())
    					{
        					$('div.chat-thread').animate({scrollTop: offset}, 2000);
    					}
					}
					else
					{

					}
            	});
            	$("table.groupTable tr:eq(1)").click(function()
				{
					$("#inviteViaGroup").modal("show");

					for(var i=0; i<$("table:eq(1) tr").length; i++)
					{
						if($("table:eq(1) tr:eq("+i+") th").attr("class").charAt(0)=='k')
						{
							var threadClass=$("table:eq(1) tr:eq("+i+") th").attr("class");
							var img="<img class='rounded-circle' src="+$("table:eq(1) tr:eq("+i+") th img").attr("src")+" height='60' width='53' style='object-fit:cover;'>";
							var infos="&nbsp;&nbsp;<div style='font-size:18px;margin:-45px 0px 0px 60px;'>"+$("table:eq(1) tr:eq("+i+") th label:eq(2)").text()+"</div>";
							var about="<label style='display:none;'>"+$("table:eq(1) tr:eq("+i+") th label:eq(1)").text()+"</label>";
							var name="<br><label style='margin:-20px 0px 0px 60px;font-size:13.9px;font-weight:normal'>~ "+$("table:eq(1) tr:eq("+i+") th label:eq(0)").text()+"</label>";

							$("#inviteViaGroup").find("table").append("<tr><th class='tC"+threadClass+"' style='border-top:none !important;'>"+img+infos+"<i class='fa fa-send-o mt-n4 selectThread'  style='float:right;font-size:20px'></i>"+about+name+"</th></tr>");
						}
						else
						{
							var threadClass=$("table:eq(1) tr:eq("+i+") th").attr("class");
							var img="<img class='rounded-circle' src="+$("table:eq(1) tr:eq("+i+") th img").attr("src")+" height='60' width='53' style='object-fit:cover;'>";
							var name="&nbsp;&nbsp;<label style='font-size:19px'>"+$("table:eq(1) tr:eq("+i+") th label:eq(0)").text()+"</label>";
							var about="<label style='display:none;'>"+$("table:eq(1) tr:eq("+i+") th label:eq(1)").text()+"</label>";
							var infos="<br><div style='margin:-20px 0px 0px 60px;font-size:13.9px;font-weight:normal'>"+$("table:eq(1) tr:eq("+i+") th label:eq(2)").text()+"</div>";

							$("#inviteViaGroup").find("table").append("<tr><th class='tC"+threadClass+"' style='border-top:none !important;'>"+img+name+"<i class='fa fa-send-o mt-3 selectThread'  style='float:right;font-size:20px'></i>"+about+infos+"</th></tr>");
						}
					}
				});
				$("#inviteViaGroup").on("hidden.bs.modal", function()
				{
					$("#inviteViaGroup").find("table").empty();
					$(".selectThread").show();
					$("#inviteViaGroup").find(".modal-content").css("height","530px");
					$("#inviteViaGroup").find(".row:eq(1)").show();
					$("#inviteViaGroup").find(".row:eq(2)").css("height","378px");
					$(".Threadform").hide();
				});
				$("input.searchThread").on("keyup", function() 
				{
    				var value = $(this).val().toLowerCase();
    				$("table.tableThread tr").filter(function() 
    				{
      					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    				});
 				 });
				$("body").on("click",".selectThread",function(event)
				{
					$(event.target).parent().parent().siblings().remove();
					$(".selectThread").hide();
					$("#inviteViaGroup").find(".modal-content").animate({height:"225px"},1000);
					$("#inviteViaGroup").find(".row:eq(1)").fadeOut(200);
					$("#inviteViaGroup").find(".row:eq(2)").css("height","95px");
					$(".Threadform").fadeIn(1000);
				});
				$(".sendViaGroup").on("click",function()
				{
					$("#inviteViaGroup").modal("hide");

					var i=$("#inviteViaGroup").find("table tr th").attr("class").slice(2);
					$("div.msg"+i).attr("data-running",1);

					var j = $("div.msg"+i).data("count") || 0;

					var photo=$("div.msg"+i).data("photo") || 0;
					var video=$("div.msg"+i).data("video") || 0;
					var docum=$("div.msg"+i).data("docum") || 0;
					var ccard=$("div.msg"+i).data("ccard") || 0;
					var tonly=$("div.msg"+i).data("tonly") || 0;

					var img="<img class='rounded-circle' src="+$("div.profile").find("img:eq(0)").attr("src")+" height='60' width='53' style='object-fit:cover;'>";
					var name="&nbsp;&nbsp;<label style='font-size:20px'>"+$("div.profile").find("table:eq(0) tr td h2").text()+"</label>";
					var about="<label style='display:none;'>"+$("div.profile").find("table:eq(0) tr td h4").text()+"</label>";
					var info="<br><label style='margin:-20px 0px 0px 56px; font-size:13px;font-weight:normal:position:relative;'>"+$("div.profile").find("table:eq(0) tr td label").text()+"</label>";

					if(j==0)
					{
						$("div.msg"+i).prepend("<div class='list-group-item bg-dark text-white myTxt' style='border-radius:10px;margin:10px 0px 0px 320px;width:226px;'>"+img+name+about+info+"<span class='btn btn-sm badge-pill btn-primary joinGroup' style='margin:5px 0px 0px 0px;width:180px;'>Join Group</span><label style='margin-bottom:-11px;padding:12px 0px 5px 0px;'>"+$("input[placeholder='Tell something about this group.']").val()+"</label></div>");
					}
					else
					{
						$('div.msg'+i+' div:eq('+(j-1)+')').after("<div class='list-group-item bg-dark text-white myTxt' style='border-radius:10px;margin:10px 0px 0px 320px;width:226px;'>"+img+name+about+info+"<span class='btn btn-sm badge-pill btn-primary joinGroup' style='margin:5px 0px 0px 0px;width:180px;'>Join Group</span><label style='margin-bottom:-11px;padding:12px 0px 5px 0px;'>"+$("input[placeholder='Tell something about this group.']").val()+"</label></div>");
					}

					var emoji_regex = /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/;

					if(emoji_regex.test($("div.msg"+i+" div:eq("+j+") label:last").text())==true)
					{
						$("div.msg"+i+" div:eq("+j+") label:last").css("font-size","27px");
					}

					$("th."+i).parent().insertBefore("table:eq(1) tr:eq(0)");
					$("th."+i+" div").css("font-weight","normal").text("You: 👩🏻‍🤝‍🧑🏼 Group Invite");

					$("div.msg"+i).data("photo",photo);
					$("div.msg"+i).data("video",video);
					$("div.msg"+i).data("ccard",ccard);
					$("div.msg"+i).data("docum",docum);
					$("div.msg"+i).data("tonly",tonly);
					if($(".profile").attr("data-active")==i)
					{
						$("table.stats tr:eq(0) td label:eq(1)").text(photo+video);
						$("table.stats tr:eq(1) td label:eq(1)").text(docum);
						$("table.stats tr:eq(2) td label:eq(1)").text(ccard);
						$("table.stats tr:eq(3) td label:eq(1)").text(tonly);
					}

					$("div.msg"+i).data("count", ++j);
					$("div.chat-thread").animate({scrollTop: 0}, 2000);

					setTimeout(function()
					{
						$('div.msg'+i).find('.txtstatus').remove();
						$('div.msg'+i+' div:eq('+(j-1)+')').after("<span style='color:white;margin-left:505px;' class='txtstatus'>Sent</span>");
						setTimeout(function()
						{
							if(i.charAt(0)!="g")
							{
								$('div.msg'+i).find('.txtstatus').css("margin-left","475px").text("Delivered");
							}

							$("div.msg"+i).animate({scrollTop: $("div.msg"+i).prop('scrollHeight')-0+100000}, 2000);
							setTimeout(function()
							{
								var pre=$("div.msg"+i).attr("data-predefined-txts")-0;
								if($('div.msg'+i+' div:hidden').length==0)
								{
									$('div.status'+i).text("Offline").addClass('badge-danger').removeClass('badge-success');
									$("div.msg"+i).attr("data-running",0);
								}
								else
								{
									setTimeout(function()
									{
										if(i.charAt(0)!="g")
										{
											$('div.msg'+i).find('.txtstatus').css("margin-left","505px").text("Seen");
										}
										setTimeout(function()
										{
											$('div.status'+i).text("Typing...");
											if(i.charAt(0)!="g")
											{
												$("table:eq(1) tr th."+i+" span:last").removeClass("badge-primary blink").addClass("badge-success").html("Typing...");
											}
											else
											{
												$("table:eq(1) tr th."+i+" span:last").removeClass("badge-primary mt-n4 blink").addClass("badge-success mt-n5").css({"font-size":"10px","padding":"5px !important","float":"right","height":"30px","width":"100px"}).html($('div.msg'+i+' div:eq('+j+') em').text()+"<br>is Typing...");
											}
											setTimeout(function()
											{
												$('div.msg'+i).find('.txtstatus').remove();
												$('div.status'+i).text("Active Now");
												$("table:eq(1) tr th."+i+" span:last").html("");
												$('div.msg'+i+' div:eq('+j+')').show(1500,function()
												{
													if(i.charAt(0)!="g")
													{
														$("table:eq(1) tr th."+i).parent().show();
													}

													if(emoji_regex.test($("div.msg"+i+" div:eq("+j+") label:last").text())==true)
													{
														$("div.msg"+i+" div:eq("+j+") label:last").css("font-size","27px");
													}

													if($(this).find("em").length==1)
													{
														$(this).find("em").css("color",colors[Math.floor(Math.random() * colors.length)]);
													}
														
													$("th."+i).parent().insertBefore("table:eq(1) tr:eq(0)");

													if($(this).find("img").length==1 && $(this).find("label").length==1)
													{
														if($(this).find("em").length==1)
														{
															$("th."+i+" div").css("font-weight","normal").text($(this).find("em").text()+": 📸 Photo");
														}	
														else
														{
															$("th."+i+" div").css("font-weight","normal").text("📸 Photo");
														}
														$("div.msg"+i).data("photo",$("div.msg"+i).data("photo")-0+1);
													}
													else if($(this).find("video").length==1 && $(this).find("label").length==1)
													{
														if($(this).find("em").length==1)
														{
															$("th."+i+" div").css("font-weight","normal").text($(this).find("em").text()+": 🎥 Video");
														}
															else
															{
																$("th."+i+" div").css("font-weight","normal").text("🎥 Video");
															}
															$("div.msg"+i).data("video",$("div.msg"+i).data("video")-0+1);
													}
													else if($(this).find("img").length==1 && $(this).find("label").length==4 && $(this).find("span").length==2)
													{
															if($(this).find("em").length==1)
															{
																$("th."+i+" div").css("font-weight","normal").text($(this).find("em").text()+": 📇 Contact Card");
															}
															else
															{
																$("th."+i+" div").css("font-weight","normal").text("📇 Contact Card");
															}
															$("div.msg"+i).data("ccard",$("div.msg"+i).data("ccard")-0+1);
													}
													else if($(this).find("img").length==1 && $(this).find("label").length==4 && $(this).find("span").length==1)
													{
															if($(this).find("em").length==1)
															{
																$("th."+i+" div").css("font-weight","normal").text($(this).find("em").text()+": 👩🏻‍🤝‍🧑🏼 Group Invite");
															}
															else
															{
																$("th."+i+" div").css("font-weight","normal").text("👩🏻‍🤝‍🧑🏼 Group Invite");
															}
													}
													else if($(this).find("a").length==1 && $(this).find("label").length==1)
													{
															if($(this).find("em").length==1)
															{
																$("th."+i+" div").css("font-weight","normal").text($(this).find("em").text()+": 📨 Document");
															}
															else
															{
																$("th."+i+" div").css("font-weight","normal").text("📨 Document");
															}
															$("div.msg"+i).data("docum",$("div.msg"+i).data("docum")-0+1);
													}
													else
													{
															var d=$(this).find("label:last").text();
															if($(this).find("em").length==1)
															{
																d=$(this).find("em").text()+": "+d;
															}
															if(d<=25)
															{
																$("th."+i+" div").css("font-weight","normal").text(d);
															}
															else
															{
																$("th."+i+" div").css("font-weight","normal").text(d.slice(0,25)+"....");
															}
															$("div.msg"+i).data("tonly",$("div.msg"+i).data("tonly")-0+1);
													}
													if($(".profile").attr("data-active")==i)
													{
														var x=$("div.msg"+i).data("photo")-0;
														var z=$("div.msg"+i).data("video")-0;

														$("table.stats tr:eq(0) td label:eq(1)").text(x+z);
														$("table.stats tr:eq(1) td label:eq(1)").text($("div.msg"+i).data("docum"));
														$("table.stats tr:eq(2) td label:eq(1)").text($("div.msg"+i).data("ccard"));
														$("table.stats tr:eq(3) td label:eq(1)").text($("div.msg"+i).data("tonly"));
													}

													$("div.msg"+i).data("count", ++j);

													var l=$("div.txt").attr("data-active");

													if(tabswitch || l!=i)
													{
														if(i.charAt(0)!='g')
														{
															$("table:eq(1) tr th."+i+" span:last").removeClass("badge-success").addClass("badge-primary blink").html("New");
														}
														else
														{
															$("table:eq(1) tr th."+i+" span:last").removeClass("badge-success mt-n5").addClass("badge-primary blink mt-n4").css({"font-size":"10px","padding":"","float":"right","height":"","width":""}).html("New");
														}
														$("th."+i+" div").css("font-weight","bold");

														if(i.charAt(0)!='g' || (i.charAt(0)=='g' && $("table:eq(1) tr th."+i).parent().css("display")!="none"))
														{
															var p=$(".recordnew span").data("count") || 0;
															var t=$(".recordnew span").data("thread") || "";
															if(t.indexOf(i)==-1)
															{
																$(".recordnew").html("New Messages <span style='display:none;' class='badge badge-light blink'>0</span>");
																$(".recordnew span").data("count",++p).text(p).data("thread",$(".recordnew span").data("thread")+" "+i).show('slow');
															}
															
															if(signout==false)
															{
																if(t.indexOf(i)==-1)
																{
																	$("title").text("QuickChat • New Messages ("+p+")");
																}
																var audio = new Audio('pristine.mp3');
																audio.play();
															}
														}
													}	

													$("div.msg"+i).animate({scrollTop: $("div.msg"+i).prop('scrollHeight')-0+100000}, 2000);
													$("div.msg"+i).attr("data-running",0);
												});
											},6000);
										},1000);
									},3000);
								}
							},2000);
						},500);
					},500);
				});
				$(".createNewGroup").click(function()
				{
					$("#newGroup").modal("show");

					var countu=0;
					for(var m=0; m<=$("table:eq(1) tr").length-1; m++)
					{
						if($("table:eq(1) tr:eq("+m+") th").attr("class").charAt(0)=='u')
						{
							if(countu==0)
							{
								countu=$("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0;
							}
							else
							{
								if($("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0 > countu)
								{
									countu=$("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0;
								}
							}
						}
					}

					for(var i=1; i<=countu; i++)
					{
						if($(".u"+i).length==1)
						{
							var img="<img class='rounded-circle' src="+$("table:eq(1) tr th.u"+i+" img").attr("src")+" height='60' width='53' style='object-fit:cover;'>";
							var name="&nbsp;&nbsp;<label style='font-size:19px'>"+$("table:eq(1) tr th.u"+i+" label:eq(0)").text()+"</label>";
							var about="<label style='display:none;'>"+$("table:eq(1) tr th.u"+i+" label:eq(1)").text()+"</label>";
							var contact="<br><div style='margin:-20px 0px 0px 60px;font-size:13.9px;font-weight:normal'>"+$("table:eq(1) tr th.u"+i+" label:eq(2)").text()+"</div>";

							$(".tableUsers").append("<tr><th style='padding:30px 0px 0px 45px;border:none !important;width:65px;'><input type='checkbox' class='form-check-input'></th><th style='border:none !important;'>"+img+name+about+contact+"</th></tr>");							
						}
					}

					for(var k=0; k<$(".tableUsers tr").length-1; k++)
					{
						for(var l=0; l<$(".tableUsers tr").length-k-1; l++)
						{
							if($(".tableUsers tr:eq("+l+") label:eq(0)").text().localeCompare($(".tableUsers tr:eq("+(l+1)+") label:eq(0)").text()) > 0)
							{
								var a=$(".tableUsers tr:eq("+l+")").html();
								$(".tableUsers tr:eq("+l+")").html($(".tableUsers tr:eq("+(l+1)+")").html());
								$(".tableUsers tr:eq("+(l+1)+")").html(a);
							}
						}
					}
				});
				$("#newGroup").on("hidden.bs.modal", function()
				{
					$("#newGroup").find("table.tableUsers").empty();
					$("table.createGroup").find("input:eq(0)").val("");
					$("table.createGroup").find("input:eq(1)").val("");
					$("#newGroup").find("img:eq(0)").attr("src","http://edgeway.eu/wp-content/uploads/2018/04/consulting.png");
				});
				$("input.searchUsers").on("keyup", function() 
				{
    				var value = $(this).val().toLowerCase();
    				$("table.tableUsers tr").filter(function() 
    				{
      					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    				});
 				 });
				$("button.saveNewGroup").click(function()
				{
					var flag=false;
					for(var k=0; k<$(".tableUsers tr").length; k++)
					{
						if($("table.tableUsers tr:eq("+k+") th:eq(0) input").prop('checked'))
						{
							flag=true;
						}
					}						
					if($("table.createGroup").find("input:eq(0)").val()!="" && $("table.createGroup").find("input:eq(1)").val()!="" && flag==true)
					{
						var image=$("#newGroup").find("img:eq(0)").attr("src");
						var name=$("table.createGroup").find("input:eq(0)").val();
						var about=$("table.createGroup").find("input:eq(1)").val();

						var d = new Date();
						var infos="Created on "+d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();

						var newMembers="<label style='display:none;' id='members'>";
						for(var k=0; k<$(".tableUsers tr").length; k++)
						{
							if($("table.tableUsers tr:eq("+k+") th:eq(0) input").prop('checked'))
							{
								var img=$("table.tableUsers tr:eq("+k+") th:eq(1)").find("img").attr("src");
								var nm=$("table.tableUsers tr:eq("+k+") th:eq(1)").find("label:eq(0)").text();
								var abt=$("table.tableUsers tr:eq("+k+") th:eq(1)").find("label:eq(1)").text();
								var contact=$("table.tableUsers tr:eq("+k+") th:eq(1)").find("div").text();

								newMembers=newMembers+"<label><img class='rounded-circle' src="+img+" height='50' width='45' style='object-fit:cover;'>&nbsp;&nbsp;&nbsp;<label style='font-size:18px;font-weight:bold;'>"+nm+"</label><br><label style='display:none;font-size:17px;font-weight:bold;'>"+contact+"</label><label style='font-size:13px;margin-left:60px;margin-top:-20px;'>"+abt+"</label></label>";
							}
						}
						newMembers=newMembers+"</label>";

						var countg=0;
						for(var m=0; m<=$("table:eq(1) tr").length-1; m++)
						{
							if($("table:eq(1) tr:eq("+m+") th").attr("class").charAt(0)=='g')
							{
								if(countg==0)
								{
									countg=$("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0;
								}
								else
								{
									if($("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0 > countg)
									{
										countg=$("table:eq(1) tr:eq("+m+") th").attr("class").slice(1)-0;
									}
								}
							}
						}
						$("table:eq(1)").append("<tr style='cursor:pointer;'><th class='g"+(countg+1)+"'><img class='rounded-circle' src="+image+" height='50' width='45' style='object-fit:cover;'>&nbsp;&nbsp;<label style='font-size:17px;'>"+name+"</label><label style='display:none;'>"+about+"</label><label style='display:none;'>"+infos+"</label>"+newMembers+"<div style='position:relative;margin-top:-15px;margin-left:55px;height:15px;width:180px;font-size:12px;font-weight:normal;color:lightgrey;'></div><span class='badge badge-pill mt-n5' style='font-size:10px;float:right;'></span></th></tr>");

						$("div.txt form").before("<div class='list-group msg msgg"+(countg+1)+"' style='width:100%;height:522px;overflow:auto;display:none;' data-predefined-txts=0 data-running=0></div>");

						$(".UserName").attr("data-adminControls",$(".UserName").attr("data-adminControls")+"g"+(countg+1)+" ");

						$("table:eq(1) tr th.g"+(countg+1)).parent().click();
            			var offset = $("table:eq(1) tr th.g"+(countg+1)).parent().offset().top - $('div.chat-thread').scrollTop();

    					if(offset > $('div.chat-thread').innerHeight())
    					{
        					$('div.chat-thread').animate({scrollTop: offset}, 2000);
    					}

						$("#newGroup").modal("hide");
					}
					else if($("table.createGroup").find("input:eq(0)").val()!="" && $("table.createGroup").find("input:eq(1)").val()!="" && flag==false)
					{
						$("#newGroup").find("span.bg-warning").fadeIn(1500);
						setTimeout(function(){$("#newGroup").find("span.bg-warning").fadeOut(1500);},5000);
					}
				});
				$("a.recover").click(function()
				{
					$("div.custom-container:eq(1)").hide("slow",function()
					{
						$("div.custom-container:eq(2)").show("slow");
					});
				});
				var otp="Null";
				var recovery;
				$("button.genOTP").click(function()
				{
					if($("table.recoverTable1").find("input:eq(0)").val()!="" && $("table.recoverTable1").find("input:eq(0)").val()>=6000000000 && $("table.recoverTable1").find("input:eq(0)").val()<=9999999999)
					{
						$("div.custom-container:eq(2)").hide("slow",function()
						{
							$("div.custom-container:eq(3)").show("slow");
							$("#sentOTP").text("+91 "+$("table.recoverTable1").find("input:eq(0)").val());
							var found=false;
							for(var o=0; o<account.length; o++)
							{
								if($("table.recoverTable1").find("input:eq(0)").val()==account[o].phone)
								{
									otp=Math.floor(100000 + Math.random() * 900000)+"";
									console.log(otp);
									found=true;
									recovery=o;
								}
							}
							if(found==false)
							{
								console.log("Not a Registered Phone Number");
							}
						});
					}
				});
				$("a.backToLogin").click(function()
				{
					$("div.custom-container:eq(2),div.custom-container:eq(3)").hide("slow",function()
					{
						$("div.custom-container:eq(1)").show("slow");
					});
				});
				$("button.checkOTP").click(function()
				{
					var flag=0;
					for(var i=1; i<=6; i++)
					{
						if($("#codeBox"+i).val()==otp.charAt(i-1))
						{
							flag++;
						}
					}
					if(flag==6)
					{
						$("div.custom-container:eq(3)").hide("slow",function()
						{
							$("div.custom-container:eq(4)").show("slow");
						});
					}
					else
					{
						$("div.custom-container:eq(3)").find("span.bg-warning").fadeIn(1500);
						setTimeout(function(){$("div.custom-container:eq(3)").find("span.bg-warning").fadeOut(1500);},5000);
					}
				});
				$("button.updatePasswordButton").click(function()
				{
					if($("table.updatePassword").find("input:eq(0)").val()!="" && $("table.updatePassword").find("input:eq(1)").val()!="")
					{
						if($("table.updatePassword").find("input:eq(0)").val()==$("table.updatePassword").find("input:eq(1)").val())
						{
							account[recovery].password=$("table.updatePassword").find("input:eq(0)").val();
							$("div.custom-container:eq(4)").find("span").addClass("bg-success").removeClass("bg-warning").text("Password Updated Successfully").fadeIn(1500);
							setTimeout(function()
							{
								$("div.custom-container:eq(4)").find("span").addClass("bg-success").removeClass("bg-warning").text("Please wait while we redirect you to Login Page").fadeIn(1500,function()
									{
										setTimeout(function()
										{
											$("div.custom-container:eq(4)").hide("slow",function()
											{
												$("div.custom-container:eq(1)").show("slow");
												$("div.custom-container:eq(4)").find("span").fadeOut(1500);
											});
										},2500);
									});
							},2500);
						}
						else
						{
							$("div.custom-container:eq(4)").find("span").addClass("bg-warning").removeClass("bg-success").text("Passwords Doesn't Match").fadeIn(1500);
							setTimeout(function(){$("div.custom-container:eq(4)").find("span").fadeOut(1500);},2500);
						}
					}
				});
			});