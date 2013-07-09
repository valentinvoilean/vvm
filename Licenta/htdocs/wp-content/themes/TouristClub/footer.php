  <footer>
    <section>
      <div class="column">
        <h2>Despre TouristClub</h2>
        <p>
          - cel mai popular site de rezervări directe conf. trafic.ro,<br>
          - peste 5.500 de unitati de cazare din toata Romania,<br>
          - detalii complete si poze din fiecare camera,<br>
          - 13777 recenzii la hoteluri si pensiuni,<br>
          - tarife de cazare actualizate zilnic,<br>
          - contact direct cu hotelierii, fără intermediari,<br>
          - cele mai mici preturi la cazare, fără comision.
        </p>
      </div>
      <div class="column">
        <h2>Ultimele unități înscrise</h2>
        <p>
        	<?php if ( have_posts() ): query_posts("showposts=10"); while ( have_posts() ): the_post(); ?>
            	<a href="<?php the_permalink() ?>"><?php the_title(); ?> <?php the_time('(d-m-Y)') ?></a><br>
			<?php endwhile; else: ?><?php endif; ?>
        </p>
      </div>
      <div class="column">
        <h2>Tag Cloud</h2>
        <div style="height:100px">
           <?php wp_tag_cloud('smallest=8&largest=16&number=10'); ?> 
        </div>
      </div>
      <div class="column" style="margin-right:0;width:220px">
        <h2>Newsletter</h2>
        <p style="font-size:12px">
          Dacă doriți să primiți ultimele știri din partea noastră, introduceți adresa dumneavoastră de email.
        </p>
        <?php echo FrmEntriesController::show_form(18, $title=false, $description=false); ?>
        <p>
        <a href="http://facebook.com/touristclub"><img width="39" height="39" alt="Facebook" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMjgwMTE3NDA3MjA2ODExODA4M0ZEM0M2ODVGNjQxRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxM0UyRTUyNEI3MzMxMUUyQThDM0Q3N0VBMkVBMDU4RCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxM0UyRTUyM0I3MzMxMUUyQThDM0Q3N0VBMkVBMDU4RCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjZGOTczOTZFNTIwNjgxMTgwODNGRDNDNjg1RjY0MUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDI4MDExNzQwNzIwNjgxMTgwODNGRDNDNjg1RjY0MUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WFbxHAAABwUlEQVR42uyYPUvDQBjHL400Lg61tYqIm7iouIi4iTroFxDBQboqfgQ/hKCTk4NL8QMIxZdF3EWpgw6+oHYpSG1VMIn/Bx4hSC9pJJdkuAd+IZe73P3IXS53Ea7rClAEZWC7yQW1fQgG2UkYOOSFENegX6Qj6mAMvGRw2E+RGEUvKNMJPTk3hgbvQQ00AbVnglEw4HPPRJdCoRuwDY7BLUt5YwPs+Nw/pUruDMwDx6eMHVCHkVEg9gaWAsQosgH5tgq5A/DZQblaUAEV3Xruk7cOpsEXGElCTvZEVsBumIpUdKtsoM+ErSgqOUdy7o3XEG+qiGoSPgElYPHk+gBabcr1gCEWo/xFsOdTbymKMVdnoaBogKonfRlHt5r/vM+K422lRrppiHD6w6etLH/GiHwccgvgkeWIVXDUptwm2OIXxu3gCxGJHDVS8KQLknJ9IJf0PCfr1mZS85yS0HJaTstpOS2n5bRc+uUakuutsG4q9q1F3sz8jVzIekwVv8BoPfctWZRaIeqZJbkKL7XTFE9gmMbcGnhPmdwy7TNI7hlMgtMUSF2BOXDxu+P3ZtIfoHEeH05MQgbvxu5AxZvxI8AAGL7xWL5Kas8AAAAASUVORK5CYII=" /></a>
        
        <a href="http://twitter.com/touristclub"><img width="39" height="39" alt="twitter" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMjgwMTE3NDA3MjA2ODExODA4M0ZEM0M2ODVGNjQxRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxM0UyRTUyOEI3MzMxMUUyQThDM0Q3N0VBMkVBMDU4RCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxM0UyRTUyN0I3MzMxMUUyQThDM0Q3N0VBMkVBMDU4RCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjJGOTczOTZFNTIwNjgxMTgwODNGRDNDNjg1RjY0MUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDI4MDExNzQwNzIwNjgxMTgwODNGRDNDNjg1RjY0MUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz440PVwAAACO0lEQVR42syYv0scQRTH536qUTFqcoErxIAIERMUPRJMI2qChahptBIvf4P+CXZap0rwZyGelVbhihMsbCwM5CwESZMfpFBBRSHxXL8P3sFy5Jh37kx2H3x2lnuzt19mZue9ecpxHAUSYAMUHP+M3r0JkqxJhXBpVkrlwRMVDDsFneBXGJflAAkjawIbdEMj5wgfOuYRbgFd/0Hki7Cw4zRoA2Ogm9sry+JSEnGTYKXkty0wYllcSCfuoDj//7AcOLIorqATt6vxf7c5dDpxVRr/Hz/FVWv8t36K0728yaa4qEdxc6AXXIPiflkoeZYGIMLtIzAK2kXqNPHuYzHOGWZJEGvTuml1LM1YGnzzuuYci0tqPcjifgdZ3LBXcbZsVCIu6lF8lPsUXFtIuUhDG/pjMA7mTexzOsuAPvAX3JQsBWpDzANQA+pMbsIRjb8VJPwKXzFBvu9bbI0HOfDrpvXMT3EPNf5VP8U91/i3wQdrhwjB0TAF9jV93oFB0AhqeTmEXNtJmD+uBv4/ib1XgtRl0XC61AG+SFIm6aE6SeUBgzNWD35wW3bkpLE1Y3g5XYA1U4H/NVgwLDBvMiuZkQZsofWYTplmwWfwzKMwOuBM6bTdJ597Cw7BJ/CGt45K7BXYkSQdlZTAytkJ10zoaz7n6lOMczi3AEqZnip5+ayfxGVxM6SCZVSDaaFppdrbZcDETVB0IXE/eahzARD1FQyAvWJsdTtfcrCP287V3PGdYzCVdbNux50AAwA0xwskI/r60gAAAABJRU5ErkJggg==" /></a>
        
        <a href="mailto:contact@touristclub.ro"><img width="39" height="39" alt="mail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMjgwMTE3NDA3MjA2ODExODA4M0ZEM0M2ODVGNjQxRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2RUVGNzlCN0I3NEIxMUUyQThDM0Q3N0VBMkVBMDU4RCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2RUVGNzlCNkI3NEIxMUUyQThDM0Q3N0VBMkVBMDU4RCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjJGOTczOTZFNTIwNjgxMTgwODNGRDNDNjg1RjY0MUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDI4MDExNzQwNzIwNjgxMTgwODNGRDNDNjg1RjY0MUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6tKzpSAAACsElEQVR42syYPWgUQRiG5zbnJRJJEeVizhgigqhoEgR/KgsrDWphIVqIWtjZiAiiliqSOgRS2ohEG4tooSAoItpIgv9GYvwtDIKoBCSX9f3gnfCx7N7tbm7X+eC5nezs3j6ZuZn5Zo3v+waUwSio+v8v5Nk3QYVOpoCP5caYF6DDuBE/wCbwzcPHVYfEJNrBqBSk5XzjZvR6xt3Y6rJcwWW5alH9MQUugibwk6Mmj+gE4rECXGbZBAfEQ7CT5WawCsxk2W0Ue63OzYIWlo/rlmtW5S4wmUOrfQdllssUXgj9m5tj5TD4BSrS7xmKfaDQYXCWveRHyRlW7gPTMkPz5j8ZiElXrgGbwTWwEswHLwobrU/Y75McFN0NFhSxDRSb4Ll3YReGyS3hcW0GglasV4lJlOLK6WikoBYbj3NDnEm4EYKJxeLKLVbwVRqxJHJBwZ6YgtJiG9OIJZWzgp+4xPXVEXzDa/amEUsjZ1cPWebe12hBEVsP/oLdaUdQGjmZ0W+AIc7qlUCSMEExkboCTnJBTxzFFGLXwRgYAPs5QGQfMgJ+g9NgB7jDe+QfOM/yuURPU7ufR9z13IrYHR1i/Vjg/AzotzsmcCLk3jOsuxTx3adYP6vOHSumbDEd0mrPwFPQxi4NxiCPiVqwuEgxHdvqfE9iwTC5uRCx22BPA9ZWLegr0Wpcuc6MxIKCF5RoWz05m+gtY/KXhViY4DpORzXlbPkA+MKEszvDTHiQrx0O8jntteRsJirr5xbwgOWs3ghI3riaie1HlUeGyrVwWpB9xEtwJMd3I63cEnhRcn1c1Atsrfmc5Dx1LEXJSeVSh3b8nsuvI5pclnsrcvccFPsss4XIHWWq41LI3OeL3FfQD+47IPUc7AKP7VsmXbmdO/FSjlOJnbok7b+rK/4JMADDWbxR1kaskwAAAABJRU5ErkJggg==" /></a>
        
        <a href="/?feed=rss2"><img width="39" height="39" alt="rss" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMjgwMTE3NDA3MjA2ODExODA4M0ZEM0M2ODVGNjQxRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2RUVGNzlCQkI3NEIxMUUyQThDM0Q3N0VBMkVBMDU4RCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2RUVGNzlCQUI3NEIxMUUyQThDM0Q3N0VBMkVBMDU4RCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjJGOTczOTZFNTIwNjgxMTgwODNGRDNDNjg1RjY0MUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDI4MDExNzQwNzIwNjgxMTgwODNGRDNDNjg1RjY0MUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz50rGtHAAADIklEQVR42syYb2iNURzHH/deF8PdCwstDWH+tLL5c7WyV0jsxXSVhCYrvMGLodBeKBMhoiTxZkVSEjeUtldSkn+7W5p/w0VW2tow3Zltj++p31On45xznz/3uZ5ffZ77POf5nXO/55zf+fMcwzRNg6gGd0CfmX/rBy1gI6fHsG6OmMGxy7y4tWbwbBcTNwqXp4ZhLDaCZf1gNhP3GzdRI3i2LoRLyAimjYngMgQilPABHASFoBiUgFIwFxTlWdxQREjoBtcljgWgDFSBVWAFVyHfjMVcBr9j6bkNLLSRbxpIgK1gkU/a1ruNty/gHI3yGpDyQ50o7o+LMpKgHNSDH36KGw9mgakuRvEZMAfc8Cvm+Bb8Bt5Tlz0CD8Enm+XuAye9xhxbvjIOlpX7oBaE+AVaQcLjEpZwKs6yj2C3DYFe1u2EGFcZ6sq+LE0+nUZrK1iu8bsHal13rNByz6nGE0EZ2ABOg2dZankoSwueykW3tmr+gIk9BroVhTVlEfjCq7iUjTiKgUZFgc2afMVeY86OsYm2AcTBV+HdSnBVkY/5NnqJucc2Wo6nkG1WJbXeo8nT67blZoLDoA4stVG379SCHUL6WTBfM0G7ajnR0uA8iGdpwSIwKOR9o/HvzPUknASlmj+skeTZqfCt82OFGAabNAKvCf4/QVjiFwUDuR6tIRqNOxTvt9G237IJCt9BcMvplsmuXQTLJOkDNBh4q1eUcdPtgGBHEvtBJe0ubkt8uhRdO1niWyHxmwRGnMZcDyiRFHZcUsB2hcAWwe+owq/dacw1KDaVByQrgqrLxHhS7VxSTmMuqfFvFp7nKSbbB8JzuWS3zeyVU3EjGv8CSVq1JO0l6OWeY/RhLtrnbOLC/+zd5cb8VkvS45K0YfBOskEVrUenTdZyJ8ASIW00uEstINoMReFpGz2S1n18sSOFt2ABlzgOPAGXQDuYArYoam6JWyPOUHTOwluV0NXMKjXiOgz6mgqaNVmHh0zlFbA5IEdfr+mY45cVc6zb9oLO/yiKffFdABVMmPXFzztESXWMAtjMg6gwbQTYnNfFv/grwAA0gtdR8+nqLQAAAABJRU5ErkJggg==" /></a>
        </p>
      </div>
    </section>
    <section>
      <div style="width:500px;height:1px;background:#004156; display:block; margin-left:auto;margin-right:auto; border-bottom:1px solid #02a3d4"></div>
      <nav id="footernav">
        <?php wp_nav_menu( array('menu' => 'Footer' )); ?>
      </nav>
      <p style="text-align:center">© 2013 TouristClub.ro</p>
    </section>
  </footer>
  
  <?php wp_footer(); ?>
</body>
</html>