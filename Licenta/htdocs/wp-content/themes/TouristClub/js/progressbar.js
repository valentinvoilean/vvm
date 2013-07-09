 //aici e scriptul pt progress bar	  
		  $(function() {
			$( "#m_curatenie" ).progressbar({ value: <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 262, 'type' => 'average', 272 => get_the_ID() ));  ?>*10 });
			$( "#progress-label1" ).text( Math.round($( "#m_curatenie" ).progressbar( "value" ))/10);
			  progressbarValue = $( "#m_curatenie" ).find( ".ui-progressbar-value" );
			  if ($( "#m_curatenie" ).progressbar( "value" ) < 70 ) progressbarValue.css({"background": '#dc2521'});
			  if ($( "#m_curatenie" ).progressbar( "value" ) >= 70 ) {progressbarValue.css({"background": '#d7cb00'});}
			  if ($( "#m_curatenie" ).progressbar( "value" ) >= 80 ) progressbarValue.css({"background": '#3fbd65'});
			  $( "#progress-label1" ).css({'left': $( "#m_curatenie" ).progressbar( "value" )/2 + "%"});
			  
			$( "#m_confort" ).progressbar({ value: <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 264, 'type' => 'average', 272 => get_the_ID() ));  ?>*10 });
			$( "#progress-label2" ).text( Math.round($( "#m_confort" ).progressbar( "value" ))/10);
			  progressbarValue = $( "#m_confort" ).find( ".ui-progressbar-value" );
			  if ($( "#m_confort" ).progressbar( "value" ) < 70 ) progressbarValue.css({"background": '#dc2521'});
			  if ($( "#m_confort" ).progressbar( "value" ) >= 70 ) progressbarValue.css({"background": '#d7cb00'});
			  if ($( "#m_confort" ).progressbar( "value" ) >= 80 ) progressbarValue.css({"background": '#3fbd65'});
			  $( "#progress-label2" ).css({'left': $( "#m_confort" ).progressbar( "value" )/2 + "%"});
			  
			$( "#m_locatie" ).progressbar({ value: <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 265, 'type' => 'average', 272 => get_the_ID() ));  ?>*10 });
			$( "#progress-label3" ).text( Math.round($( "#m_locatie" ).progressbar( "value" ))/10);
			  progressbarValue = $( "#m_locatie" ).find( ".ui-progressbar-value" );
			  if ($( "#m_locatie" ).progressbar( "value" ) < 70 ) progressbarValue.css({"background": '#dc2521'});
			  if ($( "#m_locatie" ).progressbar( "value" ) >= 70 ) progressbarValue.css({"background": '#d7cb00'});
			  if ($( "#m_locatie" ).progressbar( "value" ) >= 80 ) progressbarValue.css({"background": '#3fbd65'});
			  $( "#progress-label3" ).css({'left': $( "#m_locatie" ).progressbar( "value" )/2 + "%"});	    
			  
			$( "#m_personal" ).progressbar({ value: <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 267, 'type' => 'average', 272 => get_the_ID() ));  ?>*10 });
			$( "#progress-label4" ).text( Math.round($( "#m_personal" ).progressbar( "value" ))/10);
			  progressbarValue = $( "#m_personal" ).find( ".ui-progressbar-value" );
			  if ($( "#m_personal" ).progressbar( "value" ) < 70 ) progressbarValue.css({"background": '#dc2521'});
			  if ($( "#m_personal" ).progressbar( "value" ) >= 70 ) progressbarValue.css({"background": '#d7cb00'});
			  if ($( "#m_personal" ).progressbar( "value" ) >= 80 ) progressbarValue.css({"background": '#3fbd65'});
			  $( "#progress-label4" ).css({'left': $( "#m_personal" ).progressbar( "value" )/2 + "%"});	    
			
			$( "#m_c_pret" ).progressbar({ value: <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 268, 'type' => 'average', 272 => get_the_ID() ));  ?>*10 });
			$( "#progress-label5" ).text( Math.round($( "#m_c_pret" ).progressbar( "value" ))/10);
			  progressbarValue = $( "#m_c_pret" ).find( ".ui-progressbar-value" );
			  if ($( "#m_c_pret" ).progressbar( "value" ) < 70 ) progressbarValue.css({"background": '#dc2521'});
			  if ($( "#m_c_pret" ).progressbar( "value" ) >= 70 ) progressbarValue.css({"background": '#d7cb00'});
			  if ($( "#m_c_pret" ).progressbar( "value" ) >= 80 ) progressbarValue.css({"background": '#3fbd65'});
			  $( "#progress-label5" ).css({'left': $( "#m_c_pret" ).progressbar( "value" )/2 + "%"});
			  
			  $( "#m_mancare" ).progressbar({ value: <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 279, 'type' => 'average', 287 => get_the_ID() ));  ?>*10 });
			$( "#progress-label6" ).text( Math.round($( "#m_mancare" ).progressbar( "value" ))/10);
			  progressbarValue = $( "#m_mancare" ).find( ".ui-progressbar-value" );
			  if ($( "#m_mancare" ).progressbar( "value" ) < 70 ) progressbarValue.css({"background": '#dc2521'});
			  if ($( "#m_mancare" ).progressbar( "value" ) >= 70 ) {progressbarValue.css({"background": '#d7cb00'});}
			  if ($( "#m_mancare" ).progressbar( "value" ) >= 80 ) progressbarValue.css({"background": '#3fbd65'});
			  $( "#progress-label6" ).css({'left': $( "#m_mancare" ).progressbar( "value" )/2 + "%"});
			  
			$( "#m_servicii" ).progressbar({ value: <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 280, 'type' => 'average', 287 => get_the_ID() ));  ?>*10 });
			$( "#progress-label7" ).text( Math.round($( "#m_servicii" ).progressbar( "value" ))/10);
			  progressbarValue = $( "#m_servicii" ).find( ".ui-progressbar-value" );
			  if ($( "#m_servicii" ).progressbar( "value" ) < 70 ) progressbarValue.css({"background": '#dc2521'});
			  if ($( "#m_servicii" ).progressbar( "value" ) >= 70 ) progressbarValue.css({"background": '#d7cb00'});
			  if ($( "#m_servicii" ).progressbar( "value" ) >= 80 ) progressbarValue.css({"background": '#3fbd65'});
			  $( "#progress-label7" ).css({'left': $( "#m_servicii" ).progressbar( "value" )/2 + "%"});
			  
			$( "#m_locatie2" ).progressbar({ value: <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 281, 'type' => 'average', 287 => get_the_ID() ));  ?>*10 });
			$( "#progress-label8" ).text( Math.round($( "#m_locatie2" ).progressbar( "value" ))/10);
			  progressbarValue = $( "#m_locatie2" ).find( ".ui-progressbar-value" );
			  if ($( "#m_locatie2" ).progressbar( "value" ) < 70 ) progressbarValue.css({"background": '#dc2521'});
			  if ($( "#m_locatie2" ).progressbar( "value" ) >= 70 ) progressbarValue.css({"background": '#d7cb00'});
			  if ($( "#m_locatie2" ).progressbar( "value" ) >= 80 ) progressbarValue.css({"background": '#3fbd65'});
			  $( "#progress-label8" ).css({'left': $( "#m_locatie2" ).progressbar( "value" )/2 + "%"});	    
			  
			$( "#m_personal2" ).progressbar({ value: <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 283, 'type' => 'average', 287 => get_the_ID() ));  ?>*10 });
			$( "#progress-label9" ).text( Math.round($( "#m_personal2" ).progressbar( "value" ))/10);
			  progressbarValue = $( "#m_personal2" ).find( ".ui-progressbar-value" );
			  if ($( "#m_personal2" ).progressbar( "value" ) < 70 ) progressbarValue.css({"background": '#dc2521'});
			  if ($( "#m_personal2" ).progressbar( "value" ) >= 70 ) progressbarValue.css({"background": '#d7cb00'});
			  if ($( "#m_personal2" ).progressbar( "value" ) >= 80 ) progressbarValue.css({"background": '#3fbd65'});
			  $( "#progress-label9" ).css({'left': $( "#m_personal2" ).progressbar( "value" )/2 + "%"});	    
			
			$( "#m_c_pret2" ).progressbar({ value: <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 284, 'type' => 'average', 287 => get_the_ID() ));  ?>*10 });
			$( "#progress-label10" ).text( Math.round($( "#m_c_pret2" ).progressbar( "value" ))/10);
			  progressbarValue = $( "#m_c_pret2" ).find( ".ui-progressbar-value" );
			  if ($( "#m_c_pret2" ).progressbar( "value" ) < 70 ) progressbarValue.css({"background": '#dc2521'});
			  if ($( "#m_c_pret2" ).progressbar( "value" ) >= 70 ) progressbarValue.css({"background": '#d7cb00'});
			  if ($( "#m_c_pret2" ).progressbar( "value" ) >= 80 ) progressbarValue.css({"background": '#3fbd65'});
			  $( "#progress-label10" ).css({'left': $( "#m_c_pret2" ).progressbar( "value" )/2 + "%"});	    		
			});	    		