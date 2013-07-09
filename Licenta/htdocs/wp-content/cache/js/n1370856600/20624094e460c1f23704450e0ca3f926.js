/* Monday 10th of June 2013 09:36:38 AM*/

(function(dojo) {
    dojo.require('dojo.window');
    dojo.declare("NextendWindow", null, {
        constructor: function(args) {
            dojo.mixin(this, args);
            if(typeof window.nextendwindows == 'undefined'){
                window.nextendwindows = [];
            }
            this.container = dojo.query('.nextend-window-container', this.node)[0];
            this.containerinner = dojo.query('.nextend-window-container-inner', this.node)[0];
            this.showed = false;
            this.onResize();
            dojo.connect(window, 'resize', this, 'onResize');

            dojo.connect(document, 'click', function(e) {
                window.nextendwindow = false;
            });

            dojo.connect(this.save, 'click', this, 'hideOverlay');
            if (this.button) dojo.connect(this.button, 'click', this, 'showOverlay');
        },

        onResize: function() {
            this.vs = dojo.window.getBox();
            if (this.showed) this.showOverlay();
        },

        showOverlay: function() {
            dojo.style(this.node, 'display', 'block');
            dojo.style(this.node, 'visibility', 'visible');
            dojo.addClass(this.node, 'active');
            var vs = this.vs;
            dojo.contentBox(this.node, {
                w: vs.w,
                h: vs.h
            });
            dojo.marginBox(this.container, {
                w: vs.w,
                h: vs.h
            });
            
            var h = dojo.position(this.container).h;
            dojo.marginBox(this.containerinner, {
                h: h-70
            });

            if (this.showed == false) this.onResize();
            this.showed = true;
            window.nextendwindows.push(this);
            setTimeout(dojo.hitch(this, 'fireEvent', window, 'resize'), 500);
        },

        hideOverlay: function(e) {
            if (e) {
                if (window.nextendwindow) return;
                window.nextendwindow = true;
            }
            this.showed = false;
            window.nextendwindows.pop();
            dojo.removeClass(this.node, 'active');
            var _this = this;
            setTimeout(function(){
                dojo.style(_this.node, 'visibility', 'hidden');
                dojo.style(_this.node, 'height', '1px');
            }, 450);
            this.onHide();
        },

        onHide: function() {

        }
    });
    
    /*
     * Close top window on ESC
     */
    dojo.connect(document, 'keyup', function(e){
        if(e.which == 27 && typeof window.nextendwindows != 'undefined' && window.nextendwindows.length > 0){
            window.nextendwindows[window.nextendwindows.length-1].hideOverlay(e);
        }
    });
})(ndojo);(function(dojo) {
    dojo.declare("NextendElement", null, {
        constructor: function(args) {

        },
        fireEvent: function(element, event) {
            if (document.createEventObject) {
                if(jQuery) return jQuery(element).trigger(event);
                // dispatch for IE
                var evt = document.createEventObject();
                return element.fireEvent('on' + event, evt)
            } else {
                // dispatch for firefox + others
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent(event, true, true); // event type,bubbling,cancelable
                return !element.dispatchEvent(evt);
            }
        }
    });
})(ndojo);(function(dojo) {
    dojo.declare("NextendElementList", NextendElement, {
        constructor: function(args) {
            dojo.mixin(this, args);
            
            this.select = dojo.byId(this.hidden+'_select');
            this.hidden = dojo.byId(this.hidden);
            
            dojo.connect(this.select, 'change', this, 'onSelect');
            
            this.hidden.select = this.select;
            this.reset();
        },

        reset: function() {
            if(this.hidden.value != this.value){
                this.value = this.hidden.value;
                var value = this.value.split('||');
                var items = dojo.query('option', this.select);
                for(var i = 0; i < items.length; i++){
                    if(value.indexOf(items[i].value) != -1){
                        items[i].selected = true;
                    }else{
                        items[i].selected = false;
                    }
                }
                this.fireEvent(this.hidden, 'change');
            }
        },
        
        onSelect: function(){
            var selected = [];
            var items = dojo.query('option', this.select);
            for(var i = 0; i < items.length; i++){
                if(items[i].selected){
                    selected.push(items[i].value);
                }
            }
            this.hidden.value = selected.join('||');
            this.reset();
        }
    });
})(ndojo);(function(dojo) {
    dojo.declare("NextendElementSubform", NextendElement, {
        constructor: function(args) {
            dojo.mixin(this, args);
            this.hidden = dojo.byId(this.hidden);
            this.form = this.hidden.form.nextendform;
            var name = dojo.attr(this.hidden, 'name').match(/\[(.*?)\]/g);
            
            if(name){
                this.name = name[name.length-1].substr(1,name[name.length-1].length-2);
                this.panel = dojo.byId('nextend-'+this.name+'-panel');
            }else{
                return;
            }
            
            dojo.connect(this.hidden, 'change', this, 'reset');
            this.reset();
        },

        reset: function() {
            if (this.value != this.hidden.value) {
                this.value = this.hidden.value;
                this.loadSubform();
            }
        },
        
        loadSubform: function(){
            var orig = [];
            if(this.value == this.origvalue){
                orig = dojo.clone(this.form.data);
            }
            var data = {
                orig: orig,
                control_name: this.form.control_name,
                xml: this.form.xml,
                tab: this.tab,
                name: this.name,
                value: this.hidden.value,
                loadedJSS: this.form.loadedJSS,
                loadedCSS: this.form.loadedCSS
            }; 
            var d = {};
            d.data = dojo.toJson(data);
            if(typeof this.form.extra != 'undefined'){
                dojo.mixin(d, this.form.extra);
            }
            dojo.mixin(d, {
                nextendajax: 1,
                mode: 'subform'
            });
            var xhrArgs = {
                url: this.form.url,
                handleAs: 'json',
                content: d,
                load: dojo.hitch(this, 'load'),
                error: dojo.hitch(this, 'error')
            };
            var deferred = dojo.xhrPost(xhrArgs);
        },
        
        load: function(response){
            this.panel.innerHTML = response.html;
            eval(response.scripts);
        },
        
        error: function(){
            console.log('error');
        }
    });
})(ndojo);(function(dojo) {
    dojo.declare("NextendElementMenuWithItems", NextendElement, {
        constructor: function(args) {
            this.value = '';
            dojo.mixin(this, args);
            this.value = this.value.split('|*|')[0];
            this.hidden = dojo.byId(this.hidden);
            this.mixed = this.hidden.nextendmixed;
            dojo.connect(this.hidden, 'change', this, 'refreshList');
        },
        
        refreshList: function(){
            var values = this.hidden.value.split('|*|');
            if(values[0] != this.value){
                this.value = values[0];
                this.removeOptions();
                this.createOptions(this.value);
            }
        },
        
        removeOptions: function(){
            var options = dojo.query('option', this.mixed.elements[1].select);
            for(var i = 1; i < options.length; i++){
                dojo.destroy(options[i]);
            }
            dojo.attr(options[0], 'selected', 'selected');
        },
        
        createOptions: function(value){
            var select = this.mixed.elements[1].select;
            var options = this.options[value];
            for(var i = 0; i < options.length; i++){
                dojo.create('option', {value: options[i][0], innerHTML: options[i][1]}, select);
            }
        }
        
        
    });
})(ndojo);(function(dojo) {
    dojo.declare("NextendElementMixed", NextendElement, {
        constructor: function(args) {
            dojo.mixin(this, args);
            this.value = '';
            this.hidden = dojo.byId(this.hidden);
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i] = dojo.byId(this.elements[i]);
                dojo.connect(this.elements[i], 'change', this, 'change');
            }
            this.reset();
            dojo.connect(this.hidden, 'change', this, 'reset');
            this.hidden.nextendmixed = this;
        },

        reset: function() {
            if (this.value != this.hidden.value) {
                this.value = this.hidden.value;
                var parts = this.value.split(this.separator);
                for (var i = 0; i < this.elements.length; i++) {
                    if (typeof parts[i] != "undefined") {
                        this.elements[i].value = parts[i];
                    }
                }
                for (var i = 0; i < this.elements.length; i++) {
                    this.fireEvent(this.elements[i], 'change');
                }
            }
        },

        change: function() {
            var value = '';
            for (var i = 0; i < this.elements.length; i++) {
                if (i != 0) value += this.separator;
                value += this.elements[i].value;
            }
            this.value = this.hidden.value = value;
            this.fireEvent(this.hidden, 'change');
        }
    });
})(ndojo);(function(dojo) {
    dojo.declare("NextendElementOnoff", NextendElement, {
        constructor: function(args) {
            dojo.mixin(this, args);
            this.value = -1;
            this.hidden = dojo.byId(this.hidden);

            dojo.connect(this.hidden, 'change', this, 'reset');

            this.reset();
            dojo.connect(this.hidden.parentNode, 'click', this, 'switchSelected');
        },

        reset: function() {
            if (this.value != this.hidden.value) {
                this.value = this.hidden.value;
                this.setSelected(this.value);
            }
        },

        setSelected: function(x) {
            if (x == 1) {
                dojo.addClass(this.hidden.parentNode, 'nextend-onoff-on');
            } else {
                dojo.removeClass(this.hidden.parentNode, 'nextend-onoff-on');
            }
        },

        switchSelected: function() {
            var val = 0;
            if (this.value == 1) val = 0;
            else val = 1;
            this.hidden.value = val;
            this.fireEvent(this.hidden, 'change');
        }
    });
})(ndojo);(function(dojo) {
    dojo.declare("NextendElementSkin", NextendElement, {
        constructor: function(args) {
            dojo.mixin(this, args);
            
            this.hidden = dojo.byId(this.hidden);
            this.select = this.hidden.select;
            this.origText = this.select.options[0].text;
            dojo.connect(this.hidden, 'change', this, 'loadSkin');
        },
        
        loadSkin: function(){
            if(this.hidden.value != '0' && this.skins[this.hidden.value]){
                var skin = this.skins[this.hidden.value];
                for (var k in skin) {
                    if (skin.hasOwnProperty(k)) {
                        var el = dojo.byId(this.preid+k);
                        if(el){
                            if(el.value.substr(0, 2) == '{"'){ // font
                                var orig = dojo.fromJson(el.value);
                                var font = dojo.fromJson(skin[k]);
                                for (var tab in font) {
                                    if (font.hasOwnProperty(tab)) {
                                        if(typeof font[tab].reset != 'undefined'){
                                            orig[tab] = {};
                                        }
                                        if(typeof orig[tab] == 'undefined') orig[tab] = {};
                                        for (var prop in font[tab]) {
                                            if (font[tab].hasOwnProperty(prop)) {
                                                orig[tab][prop] = font[tab][prop];
                                            }
                                        }
                                    }
                                }
                                el.value = dojo.toJson(orig);
                            }else{
                                el.value = skin[k];
                            }
                            this.fireEvent(el, 'change');
                        }
                    }
                };
                
                
                this.changeText('Done');
                this.select.selectedIndex = 0;
                this.fireEvent(this.select, 'change');
                setTimeout(dojo.hitch(this, 'changeText', this.origText), 3000);
            }
        },
        
        changeText: function(text){
            this.select.options[0].text = text;
        }
    });
})(ndojo);(function(dojo) {
    dojo.declare("NextendElementFontmanager", NextendElement, {
        constructor: function(args) {
            dojo.mixin(this, args);
            this.hidden = dojo.byId(this.hidden);
            this.button = dojo.byId(this.button);
            this.importbtn = dojo.byId(this.importbtn);
            dojo.connect(this.importbtn, 'click', this, 'doImport');
            this.exportbtn = dojo.byId(this.exportbtn);
            dojo.connect(this.exportbtn, 'click', this, 'doExport');
            this.message = dojo.byId(this.message);
            this.fontmanager = window.nextendfontmanager;
            dojo.connect(this.button, 'click', this, 'showFontmanager');
            
            var importbuttons = dojo.query('.nextend-font-import');
            for(var i = 0; i < importbuttons.length; i++){
                dojo.style(importbuttons[i], 'visibility', 'hidden');
            }
        },
        
        showFontmanager: function(){
            this.fontmanager.firsttab = this.firsttab;
            this.fontmanager.show(this.tabs, this.hidden.value);
            this.fontmanager.onSave = dojo.hitch(this,'save');
        },
        
        save: function(value){
            this.hidden.value = value;
            this.fontmanager.onSave = function(){};
        },
        
        doImport: function(){
            dojo.style(this.hidden, 'width', '100%'); 
            if(typeof window.fontmanagercopy != 'undefined'){
                this.hidden.value = window.fontmanagercopy;
                this.fireEvent(this.hidden, 'change');
                this.changeMessage('Importing done...');
            }else{
                dojo.attr(this.hidden, 'type', 'text');
                this.hidden.focus();
                this.hidden.select();
            }
        },
        
        doExport: function(){
            window.fontmanagercopy = this.hidden.value;
            this.changeMessage('Now you can import the settings of this font!');
            var importbuttons = dojo.query('.nextend-font-import');
            for(var i = 0; i < importbuttons.length; i++){
                dojo.style(importbuttons[i], 'visibility', 'visible');
            }
            //dojo.style(this.hidden, 'width', '100%'); 
            //dojo.attr(this.hidden, 'type', 'text');

            //this.hidden.focus();
            //this.hidden.select();
        },
        
        changeMessage: function(text){
            if(this.timeout) clearTimeout(this.timeout);
            this.message.innerHTML = text;
            this.timeout = setTimeout(dojo.hitch(this, 'changeMessage', ''), 5000);
        }
    });
})(ndojo);(function(dojo) {
    dojo.declare("NextendFontmanager", NextendElement, {
        
        defaults: {
            afont: 'Arial',
            color: '000000',
            size: '12|*|px',
            lineheight: 'normal',
            bold: 0,
            italic: 0,
            underline: 0,
            paddingleft: 0,
            align: 'left',
            tshadow: '0|*|0|*|0|*|000000FF'
        },
        
        constructor: function(args) {
            this.dataset = true;
            dojo.mixin(this, args);
            this.node = dojo.byId(this.node);
            if (typeof window.nextendfontmanager != 'undefined') {
                dojo.destroy(this.node);
                return;
            }
            window.nextendfontmanager = this;
            dojo.attr(this.node, 'id', 'nextend-fontmanager-lightbox');
            this.windowel = dojo.place(this.node, dojo.body());

            this.window = new NextendWindow({
                node: dojo.byId("nextend-fontmanager-lightbox"),
                save: dojo.byId("nextend-fontmanager-save"),
                onHide: dojo.hitch(this, 'save')
            });

            this.tabsnode = dojo.byId('nextend-fontmanager-tabs');
            
            this.preview = dojo.byId('nextend-fontmanager-preview');
            
            this.cleartabnode = dojo.byId('nextend-fontmanager-cleartab');
            dojo.connect(this.cleartabnode, 'click', this, 'clearTab');

            this.family = dojo.byId('fontmanagerfamily');
            dojo.connect(this.family, 'change', this, 'changeFamily');

            this.color = dojo.byId('fontmanagercolor');
            dojo.connect(this.color, 'change', this, 'changeColor');

            this.size = dojo.byId('fontmanagersize');
            dojo.connect(this.size, 'change', this, 'changeSize');

            this.lineheight = dojo.byId('fontmanagerlineheight');
            dojo.connect(this.lineheight, 'change', this, 'changeLineheight');
            
            this.decoration = dojo.byId('fontmanagerdecoration');
            dojo.connect(this.decoration, 'change', this, 'changeDecoration');
            
            this.paddingleft = dojo.byId('fontmanagerpaddingleft');
            dojo.connect(this.paddingleft, 'change', this, 'changePaddingleft');

            this.textalign = dojo.byId('fontmanagertextalign');
            dojo.connect(this.textalign, 'change', this, 'changeAlign');

            this.textshadow = dojo.byId('fontmanagertshadow');
            dojo.connect(this.textshadow, 'change', this, 'changeTextshadow');
            
            this.backgroundcolor = dojo.byId('nextend-fontmanager-backgroundcolor');
            jQuery(this.backgroundcolor).spectrum({
                showAlpha: this.alpha,
                preferredFormat: "hex6",
                showInput: true,
                showButtons: false,
                move: dojo.hitch(this, 'backgroundChange')
            });
            dojo.style(this.backgroundcolor, 'display', 'none');
        },
        
        show: function(tabs, value){
            this.tabsnode.innerHTML = '';
            this.tabs = [];
            try{
                this.data = dojo.fromJson(value);
            }catch(e){
                this.data = {};    
            }
            this.currentTab = 0;
            for(var i = 0; i < tabs.length; i++){
                var selected = (i == this.currentTab ? ' selected' : '');
                var tab = dojo.create('div', {'class': 'nextend-tab'+selected, 'innerHTML': tabs[i], 'value': tabs[i]}, this.tabsnode);
                dojo.connect(tab, 'click', dojo.hitch(this, 'changeTab', i));
                this.tabs.push(tab);
                if(typeof this.data[tabs[i]] == 'undefined') this.data[tabs[i]] = {};
            }
            this.loadTabSettings(0);
            var _this = this;
            setTimeout(function(){
              _this.window.showOverlay();
            }, 100);
        },
        
        save: function(){
            this.data.firsttab = this.firsttab;
            this.onSave(dojo.toJson(this.data));
            this.data = null;
        },
        
        onSave: function(){},
        
        changeTab: function(i){
            if(i == this.currentTab) return;
            dojo.removeClass(this.tabs[this.currentTab], 'selected');
            this.currentTab = i;
            dojo.addClass(this.tabs[i], 'selected');
            this.loadTabSettings(i);
        },
        
        loadTabSettings: function(i){
            if(this.tabs[i].value == this.firsttab){
                dojo.style(this.cleartabnode, 'display', 'none');
            }else{
                dojo.style(this.cleartabnode, 'display', 'block');
            }
            this.dataset = false;
            var tab = this.tabs[i].value;
            var family = this.getProperty(tab,'afont').split('||'); // split for a while for compatibility
            this.family.value = family[0];
            this.fireEvent(this.family, 'change');
            
            this.color.value = this.getProperty(tab,'color');
            this.fireEvent(this.color, 'change');
            
            var size = this.getProperty(tab,'size').split('||'); // split for a while for compatibility
            this.size.value = size.join('|*|');
            this.fireEvent(this.size, 'change');
            
            this.lineheight.value = this.getProperty(tab,'lineheight');
            this.fireEvent(this.lineheight, 'change');
            
            var decoration = [];
            if(this.getProperty(tab,'bold') == 1)
                decoration.push('bold');
            if(this.getProperty(tab,'italic') == 1)
                decoration.push('italic');
            if(this.getProperty(tab,'underline') == 1)
                decoration.push('underline');
            this.decoration.value = decoration.join('||');
            this.fireEvent(this.decoration, 'change');
            
            this.paddingleft.value = this.getProperty(tab,'paddingleft');
            this.fireEvent(this.paddingleft, 'change');
            
            this.textalign.value = this.getProperty(tab,'align');
            this.fireEvent(this.textalign, 'change');
            
            var shadow = this.getProperty(tab,'tshadow').replace(/\|\|px/g, '');
            this.textshadow.value = shadow;
            this.fireEvent(this.textshadow, 'change');
            this.dataset = true;
        },
        
        getProperty: function(tab, prop){
            var value = this.data[tab];
            if(value && typeof value[prop] != 'undefined'){
                return value[prop];
            }else if(tab != this.firsttab){
                return this.getProperty(this.firsttab, prop);
            }
            if(console) console.log('Undefined '+tab+' property '+prop);
            return this.defaults[prop];
            return "";
        },
        
        setProperty: function(tab, prop, value){
            if(this.dataset) this.data[tab][prop] = value;
        },
        
        getCurrentProperty: function(prop, value){
            this.getProperty(this.tabs[this.currentTab].value, prop, value);
        },
        
        setCurrentProperty: function(prop, value){
            this.setProperty(this.tabs[this.currentTab].value, prop, value);
        },
        
        clearTab: function(){
            if(this.tabs[this.currentTab].value != this.firsttab){
                this.data[this.tabs[this.currentTab].value] = {};
                this.loadTabSettings(this.currentTab);
            }
        },

        changePreview: function(prop, value) {
            try{
                dojo.style(this.preview, prop, value);
            }catch(err){}
        },

        changeFamily: function() {
            var family = this.family.value;
            var re = /google\(.*?family=(.*?)\);\)/g;
            var match = null;
            while(match = re.exec(this.family.value)){
                dojo.create('link', {
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: 'http://fonts.googleapis.com/css?family=' + match[1]
                }, dojo.body());
                
                var f = match[1].replace('+', ' ').match(/[a-zA-Z ]*/);
                family = family.replace(match[0], f[0]);
            }//google(Skranji:700&subset=latin,latin-ext)
            this.setCurrentProperty('afont', this.family.value);
            this.changePreview('fontFamily', family);
        },
        
        changeColor: function(){
            this.setCurrentProperty('color', this.color.value);
            var c = this.hex2rgba(this.color.value);
            this.changePreview('color', '#'+this.color.value.substr(0,6));
            this.changePreview('color', 'RGBA('+c[0]+','+c[1]+','+c[2]+','+c[3]+')');
        },

        changeSize: function() {
            this.setCurrentProperty('size', this.size.value.replace('|*|', '||'));
            this.changePreview('fontSize', this.size.value.replace('|*|', ''));
        },

        changeLineheight: function() {
            this.setCurrentProperty('lineheight', this.lineheight.value);
            this.changePreview('lineHeight', this.lineheight.value);
        },
        
        changeDecoration: function() {
            if(this.decoration.value.indexOf('bold') != -1){
                this.setCurrentProperty('bold', 1);
                this.changePreview('fontWeight', 'bold');
            }else{
                this.setCurrentProperty('bold', 0);
                this.changePreview('fontWeight', 'normal');
            }
            
            if(this.decoration.value.indexOf('italic') != -1){
                this.setCurrentProperty('italic', 1);
                this.changePreview('fontStyle', 'italic');
            }else{
                this.setCurrentProperty('italic', 0);
                this.changePreview('fontStyle', 'normal');
            }
            
            if(this.decoration.value.indexOf('underline') != -1){
                this.setCurrentProperty('underline', 1);
                this.changePreview('textDecoration', 'underline');
            }else{
                this.setCurrentProperty('underline', 0);
                this.changePreview('textDecoration', 'none');
            }
        },
        
        changePaddingleft: function() {
            this.setCurrentProperty('paddingleft', this.paddingleft.value);
        },

        changeAlign: function() {
            this.setCurrentProperty('align', this.textalign.value);
            this.changePreview('textAlign', this.textalign.value);
        },

        changeTextshadow: function() {
            this.setCurrentProperty('tshadow', this.textshadow.value);
            var ts = this.textshadow.value.split('|*|');
            if (ts[0] == '0' && ts[1] == '0' && ts[2] == '0') {
                this.changePreview('textShadow', 'none');
            } else {
                var c = this.hex2rgba(ts[3]);
                this.changePreview('textShadow', ts[0] + 'px ' + ts[1] + 'px ' + ts[2] + 'px ' + 'RGBA('+c[0]+','+c[1]+','+c[2]+','+c[3]+')');
            }
        },
        
        backgroundChange: function(color){
            this.changePreview('backgroundColor', '#'+color.toHexString());
        },

        hex2rgba: function(str) {
            var num = parseInt(str, 16); // Convert to a number
            return [num >> 24 & 255, num >> 16 & 255, num >> 8 & 255, (num & 255)/255];
        }
    });
})(ndojo);(function(dojo) {
    dojo.declare("NextendElementText", NextendElement, {
        constructor: function(args) {
            dojo.mixin(this, args);
            this.hidden = dojo.byId(this.hidden);

            dojo.connect(this.hidden, 'focus', this, 'focus');
            dojo.connect(this.hidden, 'blur', this, 'blur');
        },

        focus: function() {
            dojo.addClass(this.hidden.parentNode, 'focus');
        },

        blur: function() {
            dojo.removeClass(this.hidden.parentNode, 'focus');
        }
    });
})(ndojo);(function(dojo) {
    dojo.declare("NextendElementColor", NextendElement, {
        constructor: function(args) {
            dojo.mixin(this, args);
            this.value = 'ffffff';
            this.hidden = dojo.byId(this.hidden);

            dojo.connect(this.hidden, 'change', this, 'reset');

            this.reset();
            if (this.alpha == 1)
                this.alpha = true;
            else
                this.alpha = false;

            jQuery(this.hidden).spectrum({
                showAlpha: this.alpha,
                preferredFormat: (this.alpha == 1 ? "hex8" : "hex6"),
                showInput: false,
                showButtons: false,
                move: dojo.hitch(this, 'onChange'),
                change: dojo.hitch(this, 'onChange')
            });

        },
        reset: function() {
            if (this.value != this.hidden.value) {
                if (this.hidden.value.charAt(0) == '#')
                    this.hidden.value = this.hidden.value.substring(1);
                if (this.hidden.value != this.value) {
                    this.value = this.hidden.value;
                    jQuery(this.hidden).spectrum("set", this.value);
                }
            }
        },
        onChange: function(color) {
            var c = color.toString((this.alpha == 1 ? "hex8" : "hex6"));
            if (c.charAt(0) == '#')
                this.hidden.value = c.substring(1);
            else
                this.hidden.value = c;
            this.fireEvent(this.hidden, 'change');
        }
    });
})(ndojo);(function(dojo) {
    dojo.declare("NextendElementSwitcher", NextendElement, {
        constructor: function(args) {
            dojo.mixin(this, args);
            this.value = '';
            this.hidden = dojo.byId(this.hidden);

            dojo.connect(this.hidden, 'change', this, 'reset');

            this.reset();
            dojo.connect(this.hidden.parentNode, 'click', this, 'switchSelected');
        },

        reset: function() {
            if (this.value != this.hidden.value) {
                this.value = this.hidden.value;
                var i = this.values.indexOf(this.value);
                if (i == -1) {
                    i = 0;
                    this.value = this.hidden.value = this.values[i];
                    this.fireEvent(this.hidden, 'change');
                }
                this.setSelected(i);
            }
        },

        setSelected: function(x) {
            this.hidden.value = this.values[x];
            if (x == 1) {
                dojo.addClass(this.hidden.parentNode, 'nextend-switcher-on');
            } else {
                dojo.removeClass(this.hidden.parentNode, 'nextend-switcher-on');
            }
        },

        switchSelected: function() {
            var i = this.values.indexOf(this.value);
            if (i == 1) i = 0;
            else i = 1;
            this.setSelected(i);
            this.fireEvent(this.hidden, 'change');
        }
    });
})(ndojo);(function(dojo) {
    dojo.declare("NextendElementCheckbox", NextendElement, {
        constructor: function(args) {
            dojo.mixin(this, args);
            this.value = '';
            this.hidden = dojo.byId(this.hidden);
            this.checkboxes = dojo.query('.nextend-checkbox-option', this.hidden.parentNode);

            dojo.connect(this.hidden, 'change', this, 'reset');

            for (var i = 0; i < this.checkboxes.length; i++) {
                dojo.connect(this.checkboxes[i], 'click', dojo.hitch(this, 'changeSelected', i));
            }

            this.reset();
        },

        reset: function() {
            if (this.value != this.hidden.value) {
                this.value = this.hidden.value;
                this.resetValue();
            }
        },
        
        resetValue: function(){
            var values = this.hidden.value.split('||');
            for (var i = 0; i < this.checkboxes.length; i++) {
                if(values.indexOf(this.values[i]) == -1){
                    dojo.removeClass(this.checkboxes[i], 'selected');
                }else{
                    dojo.addClass(this.checkboxes[i], 'selected');
                }
            }
            this.hidden.value = values.join('||');
        },
        
        refreshValue: function(){
            var values = [];
            for (var i = 0; i < this.checkboxes.length; i++) {
                if(dojo.hasClass(this.checkboxes[i], 'selected')){
                    values.push(this.values[i]);
                }
            }
            this.hidden.value = values.join('||');
        },

        setSelected: function(x) {
            for (var i = 0; i < this.checkboxes.length; i++) {
                this.checkboxes[i].removeClass('selected');
            }
            this.checkboxes[x].addClass('selected');
        },

        changeSelected: function(x) {
            this.switchOption(x);
            this.fireEvent(this.hidden, 'change');
        },
        
        switchOption: function(i){
            dojo.toggleClass(this.checkboxes[i], 'selected');
            this.refreshValue();
        }
    });
})(ndojo);(function(dojo) {
    dojo.declare("NextendElementRadio", NextendElement, {
        constructor: function(args) {
            dojo.mixin(this, args);
            this.value = '';
            this.hidden = dojo.byId(this.hidden);
            this.radios = dojo.query('.nextend-radio-option', this.hidden.parentNode);

            dojo.connect(this.hidden, 'change', this, 'reset');

            for (var i = 0; i < this.radios.length; i++) {
                dojo.connect(this.radios[i], 'click', dojo.hitch(this, 'changeSelected', i));
            }

            this.reset();
        },

        reset: function() {
            if (this.value != this.hidden.value) {
                this.value = this.hidden.value;
                var i = this.values.indexOf(this.value);
                if (i == -1) {
                    i = this.partialSearch(this.hidden.value.replace(/^.*[\\\/]/, ''));
                    this.value = this.hidden.value = this.values[i];
                    this.fireEvent(this.hidden, 'change');
                }
                this.setSelected(i);
            }
        },

        setSelected: function(x) {
            for (var i = 0; i < this.radios.length; i++) {
                dojo.removeClass(this.radios[i], 'selected');
            }
            dojo.addClass(this.radios[x],'selected');
        },

        changeSelected: function(x) {
            this.hidden.value = this.values[x];
            this.fireEvent(this.hidden, 'change');
        },
        
        partialSearch: function(text){
            for (var i = 0; i < this.values.length; i++) {
                if(this.values[i].indexOf(text) != -1) return i;
            }
            return 0;
        }
    });
})(ndojo);(function(dojo) {
    dojo.declare("NextendForm", null, {
        constructor: function(args) {
            this.form = null;
            this.data = null;
            dojo.mixin(this, args);
            this.container = dojo.byId(this.container);
            this.form = dojo.query('input', this.container)[0].form;
            this.form.nextendform = this;
            // Special fix for Joomla 1.6, 1.7 & 2.5. Speedy save!
            if(typeof document.formvalidator != "undefined"){
                document.formvalidator.isValid = function() {return true;};
            }
        }
    });
})(ndojo);/*! qTip2 v2.0.1-28- (includes: svg ajax tips modal viewport imagemap ie6 / basic css3) | qtip2.com | Licensed MIT, GPL | Fri Mar 01 2013 22:50:30 */
(function(e,t,n){(function(e){"use strict";typeof define=="function"&&define.amd?define(["jquery"],e):jQuery&&!jQuery.fn.qtip&&e(jQuery)})(function(r){function P(n){S={pageX:n.pageX,pageY:n.pageY,type:"mousemove",scrollX:e.pageXOffset||t.body.scrollLeft||t.documentElement.scrollLeft,scrollY:e.pageYOffset||t.body.scrollTop||t.documentElement.scrollTop}}function H(e){var t=function(e){return e===o||"object"!=typeof e},n=function(e){return!r.isFunction(e)&&(!e&&!e.attr||e.length<1||"object"==typeof e&&!e.jquery&&!e.then)};if(!e||"object"!=typeof e)return s;t(e.metadata)&&(e.metadata={type:e.metadata});if("content"in e){if(t(e.content)||e.content.jquery)e.content={text:e.content};n(e.content.text||s)&&(e.content.text=s),"title"in e.content&&(t(e.content.title)&&(e.content.title={text:e.content.title}),n(e.content.title.text||s)&&(e.content.title.text=s))}return"position"in e&&t(e.position)&&(e.position={my:e.position,at:e.position}),"show"in e&&t(e.show)&&(e.show=e.show.jquery?{target:e.show}:e.show===i?{ready:i}:{event:e.show}),"hide"in e&&t(e.hide)&&(e.hide=e.hide.jquery?{target:e.hide}:{event:e.hide}),"style"in e&&t(e.style)&&(e.style={classes:e.style}),r.each(E,function(){this.sanitize&&this.sanitize(e)}),e}function B(n,u,a,f){function R(e){var t=0,n,r=u,i=e.split(".");while(r=r[i[t++]])t<i.length&&(n=r);return[n||u,i.pop()]}function U(e){return C.concat("").join(e?"-"+e+" ":" ")}function z(){var e=u.style.widget,t=B.hasClass(F);B.removeClass(F),F=e?"ui-state-disabled":"qtip-disabled",B.toggleClass(F,t),B.toggleClass("ui-helper-reset "+U(),e).toggleClass(L,u.style.def&&!e),I.content&&I.content.toggleClass(U("content"),e),I.titlebar&&I.titlebar.toggleClass(U("header"),e),I.button&&I.button.toggleClass(x+"-icon",!e)}function W(e){I.title&&(I.titlebar.remove(),I.titlebar=I.title=I.button=o,e!==s&&l.reposition())}function X(){var e=u.content.title.button,t=typeof e=="string",n=t?e:"Close tooltip";I.button&&I.button.remove(),e.jquery?I.button=e:I.button=r("<a />",{"class":"qtip-close "+(u.style.widget?"":x+"-icon"),title:n,"aria-label":n}).prepend(r("<span />",{"class":"ui-icon ui-icon-close",html:"&times;"})),I.button.appendTo(I.titlebar||B).attr("role","button").click(function(e){return B.hasClass(F)||l.hide(e),s})}function V(){var e=g+"-title";I.titlebar&&W(),I.titlebar=r("<div />",{"class":x+"-titlebar "+(u.style.widget?U("header"):"")}).append(I.title=r("<div />",{id:e,"class":x+"-title","aria-atomic":i})).insertBefore(I.content).delegate(".qtip-close","mousedown keydown mouseup keyup mouseout",function(e){r(this).toggleClass("ui-state-active ui-state-focus",e.type.substr(-4)==="down")}).delegate(".qtip-close","mouseover mouseout",function(e){r(this).toggleClass("ui-state-hover",e.type==="mouseover")}),u.content.title.button&&X()}function $(e){var t=I.button;if(!l.rendered)return s;e?X():t.remove()}function J(e,t){var i=I.title;if(!l.rendered||!e)return s;r.isFunction(e)&&(e=e.call(n,q.event,l));if(e===s||!e&&e!=="")return W(s);e.jquery&&e.length>0?i.empty().append(e.css({display:"block"})):i.html(e),t!==s&&l.rendered&&B[0].offsetWidth>0&&l.reposition(q.event)}function K(e){e&&r.isFunction(e.done)&&e.done(function(e){Q(e,null,s)})}function Q(e,t,i){function a(e){function s(t){if(t.src===b||r.inArray(t,i)!==-1)return;i.push(t),r.data(t,"imagesLoaded",{src:t.src}),n.length===i.length&&(setTimeout(e),n.unbind(".imagesLoaded"))}var t=r(this),n=t.find("img").add(t.filter("img")),i=[];if(!n.length)return e();n.bind("load.imagesLoaded error.imagesLoaded",function(e){s(e.target)}).each(function(e,t){var n=t.src,i=r.data(t,"imagesLoaded");if(i&&i.src===n||t.complete&&t.naturalWidth)s(t);else if(t.readyState||t.complete)t.src=b,t.src=n})}var o=I.content;return!l.rendered||!e?s:(r.isFunction(e)&&(e=e.call(n,q.event,l)||""),i!==s&&K(u.content.deferred),e.jquery&&e.length>0?o.empty().append(e.css({display:"block"})):o.html(e),l.rendered<0?B.queue("fx",a):(M=0,a.call(B[0],r.noop)),l)}function G(){function p(e){if(B.hasClass(F))return s;clearTimeout(l.timers.show),clearTimeout(l.timers.hide);var t=function(){l.toggle(i,e)};u.show.delay>0?l.timers.show=setTimeout(t,u.show.delay):t()}function d(e){if(B.hasClass(F)||y||M)return s;var t=r(e.relatedTarget),n=t.closest(k)[0]===B[0],i=t[0]===f.show[0];clearTimeout(l.timers.show),clearTimeout(l.timers.hide);if(this!==t[0]&&o.target==="mouse"&&n||u.hide.fixed&&/mouse(out|leave|move)/.test(e.type)&&(n||i)){try{e.preventDefault(),e.stopImmediatePropagation()}catch(a){}return}u.hide.delay>0?l.timers.hide=setTimeout(function(){l.hide(e)},u.hide.delay):l.hide(e)}function v(e){if(B.hasClass(F))return s;clearTimeout(l.timers.inactive),l.timers.inactive=setTimeout(function(){l.hide(e)},u.hide.inactive)}function m(e){l.rendered&&B[0].offsetWidth>0&&l.reposition(e)}var o=u.position,f={show:u.show.target,hide:u.hide.target,viewport:r(o.viewport),document:r(t),body:r(t.body),window:r(e)},c={show:r.trim(""+u.show.event).split(" "),hide:r.trim(""+u.hide.event).split(" ")},h=E.ie===6;B.bind("mouseenter"+j+" mouseleave"+j,function(e){var t=e.type==="mouseenter";t&&l.focus(e),B.toggleClass(O,t)}),/mouse(out|leave)/i.test(u.hide.event)&&u.hide.leave==="window"&&f.document.bind("mouseout"+j+" blur"+j,function(e){!/select|option/.test(e.target.nodeName)&&!e.relatedTarget&&l.hide(e)}),u.hide.fixed?(f.hide=f.hide.add(B),B.bind("mouseover"+j,function(){B.hasClass(F)||clearTimeout(l.timers.hide)})):/mouse(over|enter)/i.test(u.show.event)&&f.hide.bind("mouseleave"+j,function(e){clearTimeout(l.timers.show)}),(""+u.hide.event).indexOf("unfocus")>-1&&o.container.closest("html").bind("mousedown"+j+" touchstart"+j,function(e){var t=r(e.target),i=l.rendered&&!B.hasClass(F)&&B[0].offsetWidth>0,s=t.parents(k).filter(B[0]).length>0;t[0]!==n[0]&&t[0]!==B[0]&&!s&&!n.has(t[0]).length&&i&&l.hide(e)}),"number"==typeof u.hide.inactive&&(f.show.bind("qtip-"+a+"-inactive",v),r.each(w.inactiveEvents,function(e,t){f.hide.add(I.tooltip).bind(t+j+"-inactive",v)})),r.each(c.hide,function(e,t){var n=r.inArray(t,c.show),i=r(f.hide);n>-1&&i.add(f.show).length===i.length||t==="unfocus"?(f.show.bind(t+j,function(e){B[0].offsetWidth>0?d(e):p(e)}),delete c.show[n]):f.hide.bind(t+j,d)}),r.each(c.show,function(e,t){f.show.bind(t+j,p)}),"number"==typeof u.hide.distance&&f.show.add(B).bind("mousemove"+j,function(e){var t=q.origin||{},n=u.hide.distance,r=Math.abs;(r(e.pageX-t.pageX)>=n||r(e.pageY-t.pageY)>=n)&&l.hide(e)}),o.target==="mouse"&&(f.show.bind("mousemove"+j,P),o.adjust.mouse&&(u.hide.event&&(B.bind("mouseleave"+j,function(e){(e.relatedTarget||e.target)!==f.show[0]&&l.hide(e)}),I.target.bind("mouseenter"+j+" mouseleave"+j,function(e){q.onTarget=e.type==="mouseenter"})),f.document.bind("mousemove"+j,function(e){l.rendered&&q.onTarget&&!B.hasClass(F)&&B[0].offsetWidth>0&&l.reposition(e||S)}))),(o.adjust.resize||f.viewport.length)&&(r.event.special.resize?f.viewport:f.window).bind("resize"+j,m),o.adjust.scroll&&f.window.add(o.container).bind("scroll"+j,m)}function Y(){var n=[u.show.target[0],u.hide.target[0],l.rendered&&I.tooltip[0],u.position.container[0],u.position.viewport[0],u.position.container.closest("html")[0],e,t];l.rendered?r([]).pushStack(r.grep(n,function(e){return typeof e=="object"})).unbind(j):u.show.target.unbind(j+"-create")}var l=this,m=t.body,g=x+"-"+a,y=0,M=0,B=r(),j=".qtip-"+a,F="qtip-disabled",I,q;l.id=a,l.rendered=s,l.destroyed=s,l.elements=I={target:n},l.timers={img:{}},l.options=u,l.checks={},l.plugins={},l.cache=q={event:{},target:r(),disabled:s,attr:f,onTarget:s,lastClass:""},l.checks.builtin={"^id$":function(e,t,n){var o=n===i?w.nextid:n,u=x+"-"+o;o!==s&&o.length>0&&!r("#"+u).length&&(B[0].id=u,I.content[0].id=u+"-content",I.title[0].id=u+"-title")},"^content.text$":function(e,t,n){Q(u.content.text)},"^content.deferred$":function(e,t,n){K(u.content.deferred)},"^content.title.text$":function(e,t,n){if(!n)return W();!I.title&&n&&V(),J(n)},"^content.title.button$":function(e,t,n){$(n)},"^position.(my|at)$":function(e,t,n){"string"==typeof n&&(e[t]=new E.Corner(n))},"^position.container$":function(e,t,n){l.rendered&&B.appendTo(n)},"^show.ready$":function(){l.rendered?l.toggle(i):l.render(1)},"^style.classes$":function(e,t,n){B.attr("class",x+" qtip "+n)},"^style.width|height":function(e,t,n){B.css(t,n)},"^style.widget|content.title":z,"^events.(render|show|move|hide|focus|blur)$":function(e,t,n){B[(r.isFunction(n)?"":"un")+"bind"]("tooltip"+t,n)},"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":function(){var e=u.position;B.attr("tracking",e.target==="mouse"&&e.adjust.mouse),Y(),G()}},r.extend(l,{_triggerEvent:function(e,t,n){var i=r.Event("tooltip"+e);return i.originalEvent=(n?r.extend({},n):o)||q.event||o,B.trigger(i,[l].concat(t||[])),!i.isDefaultPrevented()},render:function(e){if(l.rendered)return l;var t=u.content.text,o=u.content.title,a=u.position;return r.attr(n[0],"aria-describedby",g),B=I.tooltip=r("<div/>",{id:g,"class":[x,L,u.style.classes,x+"-pos-"+u.position.my.abbrev()].join(" "),width:u.style.width||"",height:u.style.height||"",tracking:a.target==="mouse"&&a.adjust.mouse,role:"alert","aria-live":"polite","aria-atomic":s,"aria-describedby":g+"-content","aria-hidden":i}).toggleClass(F,q.disabled).data("qtip",l).appendTo(u.position.container).append(I.content=r("<div />",{"class":x+"-content",id:g+"-content","aria-atomic":i})),l.rendered=-1,y=1,o.text?(V(),r.isFunction(o.text)||J(o.text,s)):o.button&&X(),(!r.isFunction(t)||t.then)&&Q(t,s),l.rendered=i,z(),r.each(u.events,function(e,t){r.isFunction(t)&&B.bind(e==="toggle"?"tooltipshow tooltiphide":"tooltip"+e,t)}),r.each(E,function(){this.initialize==="render"&&this(l)}),G(),B.queue("fx",function(t){l._triggerEvent("render"),y=0,(u.show.ready||e)&&l.toggle(i,q.event,s),t()}),l},get:function(e){var t,n;switch(e.toLowerCase()){case"dimensions":t={height:B.outerHeight(s),width:B.outerWidth(s)};break;case"offset":t=E.offset(B,u.position.container);break;default:n=R(e.toLowerCase()),t=n[0][n[1]],t=t.precedance?t.string():t}return t},set:function(e,t){function p(e,t){var n,r,i;for(n in c)for(r in c[n])if(i=(new RegExp(r,"i")).exec(e))t.push(i),c[n][r].apply(l,t)}var n=/^position\.(my|at|adjust|target|container)|style|content|show\.ready/i,a=/^content\.(title|attr)|style/i,f=s,c=l.checks,h;return"string"==typeof e?(h=e,e={},e[h]=t):e=r.extend(i,{},e),r.each(e,function(t,i){var s=R(t.toLowerCase()),o;o=s[0][s[1]],s[0][s[1]]="object"==typeof i&&i.nodeType?r(i):i,e[t]=[s[0],s[1],i,o],f=n.test(t)||f}),H(u),y=1,r.each(e,p),y=0,l.rendered&&B[0].offsetWidth>0&&f&&l.reposition(u.position.target==="mouse"?o:q.event),l},toggle:function(e,n){function w(){e?(E.ie&&B[0].style.removeAttribute("filter"),B.css("overflow",""),"string"==typeof f.autofocus&&r(f.autofocus,B).focus(),f.target.trigger("qtip-"+a+"-inactive")):B.css({display:"",visibility:"",opacity:"",left:"",top:""}),l._triggerEvent(e?"visible":"hidden")}if(n){if(/over|enter/.test(n.type)&&/out|leave/.test(q.event.type)&&u.show.target.add(n.target).length===u.show.target.length&&B.has(n.relatedTarget).length)return l;q.event=r.extend({},n)}if(!l.rendered)return e?l.render(1):l;var o=e?"show":"hide",f=u[o],c=u[e?"hide":"show"],h=u.position,p=u.content,d=B.css("width"),v=B[0].offsetWidth>0,m=e||f.target.length===1,g=!n||f.target.length<2||q.target[0]===n.target,y,b;return(typeof e).search("boolean|number")&&(e=!v),!B.is(":animated")&&v===e&&g?l:l._triggerEvent(o,[90])?(r.attr(B[0],"aria-hidden",!e),e?(q.origin=r.extend({},S),l.focus(n),r.isFunction(p.text)&&Q(p.text,s),r.isFunction(p.title.text)&&J(p.title.text,s),!D&&h.target==="mouse"&&h.adjust.mouse&&(r(t).bind("mousemove.qtip",P),D=i),d||B.css("width",B.outerWidth()),l.reposition(n,arguments[2]),d||B.css("width",""),!f.solo||(typeof f.solo=="string"?r(f.solo):r(k,f.solo)).not(B).not(f.target).qtip("hide",r.Event("tooltipsolo"))):(clearTimeout(l.timers.show),delete q.origin,D&&!r(k+'[tracking="true"]:visible',f.solo).not(B).length&&(r(t).unbind("mousemove.qtip"),D=s),l.blur(n)),f.effect===s||m===s?(B[o](),w.call(B)):r.isFunction(f.effect)?(B.stop(1,1),f.effect.call(B,l),B.queue("fx",function(e){w(),e()})):B.fadeTo(90,e?1:0,w),e&&f.target.trigger("qtip-"+a+"-inactive"),l):l},show:function(e){return l.toggle(i,e)},hide:function(e){return l.toggle(s,e)},focus:function(e){if(!l.rendered)return l;var t=r(k),n=parseInt(B[0].style.zIndex,10),i=w.zindex+t.length,s=r.extend({},e),o;return B.hasClass(A)||l._triggerEvent("focus",[i],s)&&(n!==i&&(t.each(function(){this.style.zIndex>n&&(this.style.zIndex=this.style.zIndex-1)}),t.filter("."+A).qtip("blur",s)),B.addClass(A)[0].style.zIndex=i),l},blur:function(e){return B.removeClass(A),l._triggerEvent("blur",[B.css("zIndex")],e),l},reposition:function(n,i){if(!l.rendered||y)return l;y=1;var o=u.position.target,a=u.position,f=a.my,m=a.at,g=a.adjust,b=g.method.split(" "),w=B.outerWidth(s),x=B.outerHeight(s),T=0,N=0,C=B.css("position"),k=a.viewport,L={left:0,top:0},A=a.container,O=B[0].offsetWidth>0,M=n&&n.type==="scroll",_=r(e),D,P;if(r.isArray(o)&&o.length===2)m={x:h,y:c},L={left:o[0],top:o[1]};else if(o==="mouse"&&(n&&n.pageX||q.event.pageX))m={x:h,y:c},n=S&&S.pageX&&(g.mouse||!n||!n.pageX)?{pageX:S.pageX,pageY:S.pageY}:(!n||n.type!=="resize"&&n.type!=="scroll"?n&&n.pageX&&n.type==="mousemove"?n:(!g.mouse||u.show.distance)&&q.origin&&q.origin.pageX?q.origin:n:q.event)||n||q.event||S||{},C!=="static"&&(L=A.offset()),L={left:n.pageX-L.left,top:n.pageY-L.top},g.mouse&&M&&(L.left-=S.scrollX-_.scrollLeft(),L.top-=S.scrollY-_.scrollTop());else{o==="event"&&n&&n.target&&n.type!=="scroll"&&n.type!=="resize"?q.target=r(n.target):o!=="event"&&(q.target=r(o.jquery?o:I.target)),o=q.target,o=r(o).eq(0);if(o.length===0)return l;o[0]===t||o[0]===e?(T=E.iOS?e.innerWidth:o.width(),N=E.iOS?e.innerHeight:o.height(),o[0]===e&&(L={top:(k||o).scrollTop(),left:(k||o).scrollLeft()})):E.imagemap&&o.is("area")?D=E.imagemap(l,o,m,E.viewport?b:s):E.svg&&o[0].ownerSVGElement?D=E.svg(l,o,m,E.viewport?b:s):(T=o.outerWidth(s),N=o.outerHeight(s),L=E.offset(o,A)),D&&(T=D.width,N=D.height,P=D.offset,L=D.position);if(E.iOS>3.1&&E.iOS<4.1||E.iOS>=4.3&&E.iOS<4.33||!E.iOS&&C==="fixed")L.left-=_.scrollLeft(),L.top-=_.scrollTop();L.left+=m.x===d?T:m.x===v?T/2:0,L.top+=m.y===p?N:m.y===v?N/2:0}return L.left+=g.x+(f.x===d?-w:f.x===v?-w/2:0),L.top+=g.y+(f.y===p?-x:f.y===v?-x/2:0),E.viewport?(L.adjusted=E.viewport(l,L,a,T,N,w,x),P&&L.adjusted.left&&(L.left+=P.left),P&&L.adjusted.top&&(L.top+=P.top)):L.adjusted={left:0,top:0},l._triggerEvent("move",[L,k.elem||k],n)?(delete L.adjusted,i===s||!O||isNaN(L.left)||isNaN(L.top)||o==="mouse"||!r.isFunction(a.effect)?B.css(L):r.isFunction(a.effect)&&(a.effect.call(B,l,r.extend({},L)),B.queue(function(e){r(this).css({opacity:"",height:""}),E.ie&&this.style.removeAttribute("filter"),e()})),y=0,l):l},disable:function(e){return"boolean"!=typeof e&&(e=!B.hasClass(F)&&!q.disabled),l.rendered?(B.toggleClass(F,e),r.attr(B[0],"aria-disabled",e)):q.disabled=!!e,l},enable:function(){return l.disable(s)},destroy:function(e){function t(){var e=n[0],t=r.attr(e,_),i=n.data("qtip");l.rendered&&(r.each(l.plugins,function(e){this.destroy&&this.destroy(),delete l.plugins[e]}),B.stop(1,0).find("*").remove().end().remove(),l.rendered=s),clearTimeout(l.timers.show),clearTimeout(l.timers.hide),Y();if(!i||l===i)n.removeData("qtip").removeAttr(T),u.suppress&&t&&(n.attr("title",t),n.removeAttr(_)),n.removeAttr("aria-describedby");n.unbind(".qtip-"+a),delete N[l.id],delete l.options,delete l.elements,delete l.cache,delete l.timers,delete l.checks}if(l.destroyed)return;return l.destroyed=i,e===i?t():(B.bind("tooltiphidden",t),l.hide()),n}})}function j(e,n,u){var a,f,l,c,h,p=r(t.body),d=e[0]===t?p:e,v=e.metadata?e.metadata(u.metadata):o,m=u.metadata.type==="html5"&&v?v[u.metadata.name]:o,g=e.data(u.metadata.name||"qtipopts");try{g=typeof g=="string"?r.parseJSON(g):g}catch(y){}c=r.extend(i,{},w.defaults,u,typeof g=="object"?H(g):o,H(m||v)),f=c.position,c.id=n;if("boolean"==typeof c.content.text){l=e.attr(c.content.attr);if(c.content.attr===s||!l)return s;c.content.text=l}f.container.length||(f.container=p),f.target===s&&(f.target=d),c.show.target===s&&(c.show.target=d),c.show.solo===i&&(c.show.solo=f.container.closest("body")),c.hide.target===s&&(c.hide.target=d),c.position.viewport===i&&(c.position.viewport=f.container),f.container=f.container.eq(0),f.at=new E.Corner(f.at),f.my=new E.Corner(f.my);if(e.data("qtip"))if(c.overwrite)e.qtip("destroy");else if(c.overwrite===s)return s;return e.attr(T,!0),c.suppress&&(h=e.attr("title"))&&e.removeAttr("title").attr(_,h).attr("title",""),a=new B(e,c,n,!!l),e.data("qtip",a),e.one("remove.qtip-"+n+" removeqtip.qtip-"+n,function(){var e;(e=r(this).data("qtip"))&&e.destroy()}),a}function R(e){var t=this,n=e.elements.tooltip,o=e.options.content.ajax,u=w.defaults.content.ajax,a=i,f=s,l;e.checks.ajax={"^content.ajax":function(e,r,i){r==="ajax"&&(o=i),r==="once"?t.init():o&&o.url?t.load():n.unbind(I)}},r.extend(t,{init:function(){return o&&o.url&&n.unbind(I)[o.once?"one":"bind"]("tooltipshow"+I,t.load),t},load:function(n){function m(){var t;if(e.destroyed)return;a=s,d&&(f=i,e.show(n.originalEvent)),(t=u.complete||o.complete)&&r.isFunction(t)&&t.apply(o.context||e,arguments)}function g(t,n,i){var s;if(e.destroyed)return;p&&"string"==typeof t&&(t=r("<div/>").append(t.replace(q,"")).find(p)),(s=u.success||o.success)&&r.isFunction(s)?s.call(o.context||e,t,n,i):e.set("content.text",t)}function y(t,n,r){if(e.destroyed||t.status===0)return;e.set("content.text",n+": "+r)}if(f){f=s;return}var c=o.url.lastIndexOf(" "),h=o.url,p,d=!o.loading&&a;if(d)try{n.preventDefault()}catch(v){}else if(n&&n.isDefaultPrevented())return t;l&&l.abort&&l.abort(),c>-1&&(p=h.substr(c),h=h.substr(0,c)),l=r.ajax(r.extend({error:u.error||y,context:e},o,{url:h,success:g,complete:m}))},destroy:function(){l&&l.abort&&l.abort(),e.destroyed=i}}),t.init()}function X(e,t,n){var r=Math.ceil(t/2),i=Math.ceil(n/2),s={bottomright:[[0,0],[t,n],[t,0]],bottomleft:[[0,0],[t,0],[0,n]],topright:[[0,n],[t,0],[t,n]],topleft:[[0,0],[0,n],[t,n]],topcenter:[[0,n],[r,0],[t,n]],bottomcenter:[[0,0],[t,0],[r,n]],rightcenter:[[0,0],[t,i],[0,n]],leftcenter:[[t,0],[t,n],[0,i]]};return s.lefttop=s.bottomright,s.righttop=s.bottomleft,s.leftbottom=s.topright,s.rightbottom=s.topleft,s[e.string()]}function V(e,t){function k(e){var t=w.is(":visible");w.show(),e(),w.toggle(t)}function L(){x.width=g.height,x.height=g.width}function A(){x.width=g.width,x.height=g.height}function O(t,r,o,f){if(!b.tip)return;var l=m.corner.clone(),w=o.adjusted,E=e.options.position.adjust.method.split(" "),x=E[0],T=E[1]||E[0],N={left:s,top:s,x:0,y:0},C,k={},L;m.corner.fixed!==i&&(x===y&&l.precedance===u&&w.left&&l.y!==v?l.precedance=l.precedance===u?a:u:x!==y&&w.left&&(l.x=l.x===v?w.left>0?h:d:l.x===h?d:h),T===y&&l.precedance===a&&w.top&&l.x!==v?l.precedance=l.precedance===a?u:a:T!==y&&w.top&&(l.y=l.y===v?w.top>0?c:p:l.y===c?p:c),l.string()!==S.corner.string()&&(S.top!==w.top||S.left!==w.left)&&m.update(l,s)),C=m.position(l,w),C[l.x]+=_(l,l.x),C[l.y]+=_(l,l.y),C.right!==n&&(C.left=-C.right),C.bottom!==n&&(C.top=-C.bottom),C.user=Math.max(0,g.offset);if(N.left=x===y&&!!w.left)l.x===v?k["margin-left"]=N.x=C["margin-left"]-w.left:(L=C.right!==n?[w.left,-C.left]:[-w.left,C.left],(N.x=Math.max(L[0],L[1]))>L[0]&&(o.left-=w.left,N.left=s),k[C.right!==n?d:h]=N.x);if(N.top=T===y&&!!w.top)l.y===v?k["margin-top"]=N.y=C["margin-top"]-w.top:(L=C.bottom!==n?[w.top,-C.top]:[-w.top,C.top],(N.y=Math.max(L[0],L[1]))>L[0]&&(o.top-=w.top,N.top=s),k[C.bottom!==n?p:c]=N.y);b.tip.css(k).toggle(!(N.x&&N.y||l.x===v&&N.y||l.y===v&&N.x)),o.left-=C.left.charAt?C.user:x!==y||N.top||!N.left&&!N.top?C.left:0,o.top-=C.top.charAt?C.user:T!==y||N.left||!N.left&&!N.top?C.top:0,S.left=w.left,S.top=w.top,S.corner=l.clone()}function M(){var t=g.corner,n=e.options.position,r=n.at,o=n.my.string?n.my.string():n.my;return t===s||o===s&&r===s?s:(t===i?m.corner=new E.Corner(o):t.string||(m.corner=new E.Corner(t),m.corner.fixed=i),S.corner=new E.Corner(m.corner.string()),m.corner.string()!=="centercenter")}function _(e,t,n){t=t?t:e[e.precedance];var r=b.titlebar&&e.y===c,i=r?b.titlebar:w,s="border-"+t+"-width",o=function(e){return parseInt(e.css(s),10)},u;return k(function(){u=(n?o(n):o(b.content)||o(i)||o(w))||0}),u}function D(e){var t=b.titlebar&&e.y===c,n=t?b.titlebar:b.content,r="-moz-",i="-webkit-",s="border-radius-"+e.y+e.x,o="border-"+e.y+"-"+e.x+"-radius",u=function(e){return parseInt(n.css(e),10)||parseInt(w.css(e),10)},a;return k(function(){a=u(o)||u(s)||u(r+o)||u(r+s)||u(i+o)||u(i+s)||0}),a}function P(e){function N(e,t,n){var r=e.css(t)||p;return n&&r===e.css(n)?s:f.test(r)?s:r}var t,n,o,u=b.tip.css("cssText",""),a=e||m.corner,f=/rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i,l="border-"+a[a.precedance]+"-color",h="background-color",p="transparent",d=" !important",y=b.titlebar,E=y&&(a.y===c||a.y===v&&u.position().top+x.height/2+g.offset<y.outerHeight(i)),S=E?y:b.content;k(function(){T.fill=N(u,h)||N(S,h)||N(b.content,h)||N(w,h)||u.css(h),T.border=N(u,l,"color")||N(S,l,"color")||N(b.content,l,"color")||N(w,l,"color")||w.css(l),r("*",u).add(u).css("cssText",h+":"+p+d+";border:0"+d+";")})}function H(e){var t=e.precedance===a,n=x[t?f:l],r=x[t?l:f],i=e.string().indexOf(v)>-1,s=n*(i?.5:1),o=Math.pow,u=Math.round,c,h,p,d=Math.sqrt(o(s,2)+o(r,2)),m=[N/s*d,N/r*d];return m[2]=Math.sqrt(o(m[0],2)-o(N,2)),m[3]=Math.sqrt(o(m[1],2)-o(N,2)),c=d+m[2]+m[3]+(i?0:m[0]),h=c/d,p=[u(h*r),u(h*n)],{height:p[t?0:1],width:p[t?1:0]}}function B(e,t,n){return"<qvml:"+e+' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" '+(t||"")+' style="behavior: url(#default#VML); '+(n||"")+'" />'}var m=this,g=e.options.style.tip,b=e.elements,w=b.tooltip,S={top:0,left:0},x={width:g.width,height:g.height},T={},N=g.border||0,C;m.corner=o,m.mimic=o,m.border=N,m.offset=g.offset,m.size=x,e.checks.tip={"^position.my|style.tip.(corner|mimic|border)$":function(){m.init()||m.destroy(),e.reposition()},"^style.tip.(height|width)$":function(){x={width:g.width,height:g.height},m.create(),m.update(),e.reposition()},"^content.title.text|style.(classes|widget)$":function(){b.tip&&b.tip.length&&m.update()}},r.extend(m,{init:function(){var e=M()&&(W||E.ie);return e&&(m.create(),m.update(),w.unbind(z).bind("tooltipmove"+z,O)),e},create:function(){var e=x.width,t=x.height,n;b.tip&&b.tip.remove(),b.tip=r("<div />",{"class":"qtip-tip"}).css({width:e,height:t}).prependTo(w),W?r("<canvas />").appendTo(b.tip)[0].getContext("2d").save():(n=B("shape",'coordorigin="0,0"',"position:absolute;"),b.tip.html(n+n),r("*",b.tip).bind("click"+z+" mousedown"+z,function(e){e.stopPropagation()}))},update:function(e,t){var n=b.tip,f=n.children(),l=x.width,y=x.height,C=g.mimic,k=Math.round,O,M,D,j,F;e||(e=S.corner||m.corner),C===s?C=e:(C=new E.Corner(C),C.precedance=e.precedance,C.x==="inherit"?C.x=e.x:C.y==="inherit"?C.y=e.y:C.x===C.y&&(C[e.precedance]=e[e.precedance])),O=C.precedance,e.precedance===u?L():A(),b.tip.css({width:l=x.width,height:y=x.height}),P(e),T.border!=="transparent"?(N=_(e,o),g.border===0&&N>0&&(T.fill=T.border),m.border=N=g.border!==i?g.border:N):m.border=N=0,D=X(C,l,y),m.size=F=H(e),n.css(F).css("line-height",F.height+"px"),e.precedance===a?j=[k(C.x===h?N:C.x===d?F.width-l-N:(F.width-l)/2),k(C.y===c?F.height-y:0)]:j=[k(C.x===h?F.width-l:0),k(C.y===c?N:C.y===p?F.height-y-N:(F.height-y)/2)],W?(f.attr(F),M=f[0].getContext("2d"),M.restore(),M.save(),M.clearRect(0,0,3e3,3e3),M.fillStyle=T.fill,M.strokeStyle=T.border,M.lineWidth=N*2,M.lineJoin="miter",M.miterLimit=100,M.translate(j[0],j[1]),M.beginPath(),M.moveTo(D[0][0],D[0][1]),M.lineTo(D[1][0],D[1][1]),M.lineTo(D[2][0],D[2][1]),M.closePath(),N&&(w.css("background-clip")==="border-box"&&(M.strokeStyle=T.fill,M.stroke()),M.strokeStyle=T.border,M.stroke()),M.fill()):(D="m"+D[0][0]+","+D[0][1]+" l"+D[1][0]+","+D[1][1]+" "+D[2][0]+","+D[2][1]+" xe",j[2]=N&&/^(r|b)/i.test(e.string())?E.ie===8?2:1:0,f.css({coordsize:l+N+" "+(y+N),antialias:""+(C.string().indexOf(v)>-1),left:j[0],top:j[1],width:l+N,height:y+N}).each(function(e){var t=r(this);t[t.prop?"prop":"attr"]({coordsize:l+N+" "+(y+N),path:D,fillcolor:T.fill,filled:!!e,stroked:!e}).toggle(!!N||!!e),!e&&t.html()===""&&t.html(B("stroke",'weight="'+N*2+'px" color="'+T.border+'" miterlimit="1000" joinstyle="miter"'))})),setTimeout(function(){b.tip.css({display:"inline-block",visibility:"visible"})},1),t!==s&&m.position(e)},position:function(e){var t=b.tip,n={},i=Math.max(0,g.offset),o,p,d;return g.corner===s||!t?s:(e=e||m.corner,o=e.precedance,p=H(e),d=[e.x,e.y],o===u&&d.reverse(),r.each(d,function(t,r){var s,u,d;r===v?(s=o===a?h:c,n[s]="50%",n["margin-"+s]=-Math.round(p[o===a?f:l]/2)+i):(s=_(e,r),u=_(e,r,b.content),d=D(e),n[r]=t?u:i+(d>s?d:-s))}),n[e[o]]-=p[o===u?f:l],t.css({top:"",bottom:"",left:"",right:"",margin:""}).css(n),n)},destroy:function(){w.unbind(z),b.tip&&b.tip.find("*").remove().end().remove(),delete m.corner,delete m.mimic,delete m.size}}),m.init()}function Y(e){var n=this,o=e.options.show.modal,u=e.elements,a=u.tooltip,f=G+e.id,l;e.checks.modal={"^show.modal.(on|blur)$":function(){n.destroy(),n.init(),l.toggle(a.is(":visible"))}},r.extend(n,{init:function(){return o.on?(l=u.overlay=J.elem,a.attr(K,i).css("z-index",E.modal.zindex+r(Q).length).bind("tooltipshow"+f+" tooltiphide"+f,function(e,t,i){var s=e.originalEvent;if(e.target===a[0])if(s&&e.type==="tooltiphide"&&/mouse(leave|enter)/.test(s.type)&&r(s.relatedTarget).closest(l[0]).length)try{e.preventDefault()}catch(o){}else(!s||s&&!s.solo)&&n.toggle(e,e.type==="tooltipshow",i)}).bind("tooltipfocus"+f,function(e,t){if(e.isDefaultPrevented()||e.target!==a[0])return;var n=r(Q),i=E.modal.zindex+n.length,s=parseInt(a[0].style.zIndex,10);l[0].style.zIndex=i-1,n.each(function(){this.style.zIndex>s&&(this.style.zIndex-=1)}),n.filter("."+A).qtip("blur",e.originalEvent),a.addClass(A)[0].style.zIndex=i,J.update(t);try{e.preventDefault()}catch(o){}}).bind("tooltiphide"+f,function(e){e.target===a[0]&&r(Q).filter(":visible").not(a).last().qtip("focus",e)}),n):n},toggle:function(t,r,i){return t&&t.isDefaultPrevented()?n:(J.toggle(e,!!r,i),n)},destroy:function(){r([t,a]).removeAttr(K).unbind(f),J.toggle(e,s),delete u.overlay}}),n.init()}function et(n){var o=this,u=n.elements,a=n.options,c=u.tooltip,h=".ie6-"+n.id,p=r("select, object").length<1,d=0,v=s,m;n.checks.ie6={"^content|style$":function(e,t,n){redraw()}},r.extend(o,{init:function(){var n=r(e),s;p&&(u.bgiframe=r('<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>'),u.bgiframe.appendTo(c),c.bind("tooltipmove"+h,o.adjustBGIFrame)),m=r("<div/>",{id:"qtip-rcontainer"}).appendTo(t.body),o.redraw(),u.overlay&&!v&&(s=function(){u.overlay[0].style.top=n.scrollTop()+"px"},n.bind("scroll.qtip-ie6, resize.qtip-ie6",s),s(),u.overlay.addClass("qtipmodal-ie6fix"),v=i)},adjustBGIFrame:function(){var e=n.get("dimensions"),t=n.plugins.tip,r=u.tip,i,s;s=parseInt(c.css("border-left-width"),10)||0,s={left:-s,top:-s},t&&r&&(i=t.corner.precedance==="x"?["width","left"]:["height","top"],s[i[1]]-=r[i[0]]()),u.bgiframe.css(s).css(e)},redraw:function(){if(n.rendered<1||d)return o;var e=a.style,t=a.position.container,r,i,s,u;return d=1,e.height&&c.css(l,e.height),e.width?c.css(f,e.width):(c.css(f,"").appendTo(m),i=c.width(),i%2<1&&(i+=1),s=c.css("max-width")||"",u=c.css("min-width")||"",r=(s+u).indexOf("%")>-1?t.width()/100:0,s=(s.indexOf("%")>-1?r:1)*parseInt(s,10)||i,u=(u.indexOf("%")>-1?r:1)*parseInt(u,10)||0,i=s+u?Math.min(Math.max(i,u),s):i,c.css(f,Math.round(i)).appendTo(t)),d=0,o},destroy:function(){p&&u.bgiframe.remove(),c.unbind(h)}}),o.init()}var i=!0,s=!1,o=null,u="x",a="y",f="width",l="height",c="top",h="left",p="bottom",d="right",v="center",m="flip",g="flipinvert",y="shift",b="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",w,E,S,x="qtip",T="data-hasqtip",N={},C=["ui-widget","ui-tooltip"],k="div.qtip."+x,L=x+"-default",A=x+"-focus",O=x+"-hover",M="_replacedByqTip",_="oldtitle",D;w=r.fn.qtip=function(e,t,u){var a=(""+e).toLowerCase(),f=o,l=r.makeArray(arguments).slice(1),c=l[l.length-1],h=this[0]?r.data(this[0],"qtip"):o;if(!arguments.length&&h||a==="api")return h;if("string"==typeof e)return this.each(function(){var e=r.data(this,"qtip");if(!e)return i;c&&c.timeStamp&&(e.cache.event=c);if(a!=="option"&&a!=="options"||!t)e[a]&&e[a].apply(e[a],l);else{if(!r.isPlainObject(t)&&u===n)return f=e.get(t),s;e.set(t,u)}}),f!==o?f:this;if("object"==typeof e||!arguments.length)return h=H(r.extend(i,{},e)),w.bind.call(this,h,c)},w.bind=function(e,t){return this.each(function(o){function p(e){function t(){c.render(typeof e=="object"||u.show.ready),a.show.add(a.hide).unbind(l)}if(c.cache.disabled)return s;c.cache.event=r.extend({},e),c.cache.target=e?r(e.target):[n],u.show.delay>0?(clearTimeout(c.timers.show),c.timers.show=setTimeout(t,u.show.delay),f.show!==f.hide&&a.hide.bind(f.hide,function(){clearTimeout(c.timers.show)})):t()}var u,a,f,l,c,h;h=r.isArray(e.id)?e.id[o]:e.id,h=!h||h===s||h.length<1||N[h]?w.nextid++:N[h]=h,l=".qtip-"+h+"-create",c=j(r(this),h,e);if(c===s)return i;u=c.options,r.each(E,function(){this.initialize==="initialize"&&this(c)}),a={show:u.show.target,hide:u.hide.target},f={show:r.trim(""+u.show.event).replace(/ /g,l+" ")+l,hide:r.trim(""+u.hide.event).replace(/ /g,l+" ")+l},/mouse(over|enter)/i.test(f.show)&&!/mouse(out|leave)/i.test(f.hide)&&(f.hide+=" mouseleave"+l),a.show.bind("mousemove"+l,function(e){P(e),c.cache.onTarget=i}),a.show.bind(f.show,p),(u.show.ready||u.prerender)&&p(t)})},E=w.plugins={Corner:function(e){e=(""+e).replace(/([A-Z])/," $1").replace(/middle/gi,v).toLowerCase(),this.x=(e.match(/left|right/i)||e.match(/center/)||["inherit"])[0].toLowerCase(),this.y=(e.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase();var t=e.charAt(0);this.precedance=t==="t"||t==="b"?a:u,this.string=function(){return this.precedance===a?this.y+this.x:this.x+this.y},this.abbrev=function(){var e=this.x.substr(0,1),t=this.y.substr(0,1);return e===t?e:this.precedance===a?t+e:e+t},this.invertx=function(e){this.x=this.x===h?d:this.x===d?h:e||this.x},this.inverty=function(e){this.y=this.y===c?p:this.y===p?c:e||this.y},this.clone=function(){return{x:this.x,y:this.y,precedance:this.precedance,string:this.string,abbrev:this.abbrev,clone:this.clone,invertx:this.invertx,inverty:this.inverty}}},offset:function(e,n){function c(e,t){i.left+=t*e.scrollLeft(),i.top+=t*e.scrollTop()}var i=e.offset(),s=e.closest("body"),o=E.ie&&t.compatMode!=="CSS1Compat",u=n,a,f,l;if(u){do u.css("position")!=="static"&&(f=u.position(),i.left-=f.left+(parseInt(u.css("borderLeftWidth"),10)||0)+(parseInt(u.css("marginLeft"),10)||0),i.top-=f.top+(parseInt(u.css("borderTopWidth"),10)||0)+(parseInt(u.css("marginTop"),10)||0),!a&&(l=u.css("overflow"))!=="hidden"&&l!=="visible"&&(a=u));while((u=r(u[0].offsetParent)).length);(a&&a[0]!==s[0]||o)&&c(a||s,1)}return i},ie:function(){var e=3,n=t.createElement("div");while(n.innerHTML="<!--[if gt IE "+ ++e+"]><i></i><![endif]-->")if(!n.getElementsByTagName("i")[0])break;return e>4?e:s}(),iOS:parseFloat((""+(/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_",".").replace("_",""))||s,fn:{attr:function(e,t){if(this.length){var n=this[0],i="title",s=r.data(n,"qtip");if(e===i&&s&&"object"==typeof s&&s.options.suppress)return arguments.length<2?r.attr(n,_):(s&&s.options.content.attr===i&&s.cache.attr&&s.set("content.text",t),this.attr(_,t))}return r.fn["attr"+M].apply(this,arguments)},clone:function(e){var t=r([]),n="title",i=r.fn["clone"+M].apply(this,arguments);return e||i.filter("["+_+"]").attr("title",function(){return r.attr(this,_)}).removeAttr(_),i}}},r.each(E.fn,function(e,t){if(!t||r.fn[e+M])return i;var n=r.fn[e+M]=r.fn[e];r.fn[e]=function(){return t.apply(this,arguments)||n.apply(this,arguments)}}),r.ui||(r["cleanData"+M]=r.cleanData,r.cleanData=function(e){for(var t=0,i;(i=e[t])!==n&&i.getAttribute(T);t++)try{r(i).triggerHandler("removeqtip")}catch(s){}r["cleanData"+M](e)}),w.version="2.0.1-28-",w.nextid=0,w.inactiveEvents="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),w.zindex=15e3,w.defaults={prerender:s,id:s,overwrite:i,suppress:i,content:{text:i,attr:"title",deferred:s,title:{text:s,button:s}},position:{my:"top left",at:"bottom right",target:s,container:s,viewport:s,adjust:{x:0,y:0,mouse:i,scroll:i,resize:i,method:"flipinvert flipinvert"},effect:function(e,t,n){r(this).animate(t,{duration:200,queue:s})}},show:{target:s,event:"mouseenter",effect:i,delay:90,solo:s,ready:s,autofocus:s},hide:{target:s,event:"mouseleave",effect:i,delay:0,fixed:s,inactive:s,leave:"window",distance:s},style:{classes:"",widget:s,width:s,height:s,def:i},events:{render:o,move:o,show:o,hide:o,toggle:o,visible:o,hidden:o,focus:o,blur:o}},E.svg=function(e,n,i,s){var o=r(t),u=n[0],a={width:0,height:0,position:{top:1e10,left:1e10}},f,l,c,h,p;while(!u.getBBox)u=u.parentNode;if(u.getBBox&&u.parentNode){f=u.getBBox(),l=u.getScreenCTM(),c=u.farthestViewportElement||u;if(!c.createSVGPoint)return a;h=c.createSVGPoint(),h.x=f.x,h.y=f.y,p=h.matrixTransform(l),a.position.left=p.x,a.position.top=p.y,h.x+=f.width,h.y+=f.height,p=h.matrixTransform(l),a.width=p.x-a.position.left,a.height=p.y-a.position.top,a.position.left+=o.scrollLeft(),a.position.top+=o.scrollTop()}return a};var F,I=".qtip-ajax",q=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;F=E.ajax=function(e){var t=e.plugins.ajax;return"object"==typeof t?t:e.plugins.ajax=new R(e)},F.initialize="render",F.sanitize=function(e){var t=e.content,n;t&&"ajax"in t&&(n=t.ajax,typeof n!="object"&&(n=e.content.ajax={url:n}),"boolean"!=typeof n.once&&n.once&&(n.once=!!n.once))},r.extend(i,w.defaults,{content:{ajax:{loading:i,once:i}}});var U,z=".qtip-tip",W=!!t.createElement("canvas").getContext;U=E.tip=function(e){var t=e.plugins.tip;return"object"==typeof t?t:e.plugins.tip=new V(e)},U.initialize="render",U.sanitize=function(e){var t=e.style,n;t&&"tip"in t&&(n=e.style.tip,typeof n!="object"&&(e.style.tip={corner:n}),/string|boolean/i.test(typeof n.corner)||(n.corner=i),typeof n.width!="number"&&delete n.width,typeof n.height!="number"&&delete n.height,typeof n.border!="number"&&n.border!==i&&delete n.border,typeof n.offset!="number"&&delete n.offset)},r.extend(i,w.defaults,{style:{tip:{corner:i,mimic:s,width:6,height:6,border:i,offset:0}}});var $,J,K="is-modal-qtip",Q=k+"["+K+"]",G=".qtipmodal";J=function(){function h(e){if(r.expr[":"].focusable)return r.expr[":"].focusable;var t=!isNaN(r.attr(e,"tabindex")),n=e.nodeName.toLowerCase(),i,s,o;return"area"===n?(i=e.parentNode,s=i.name,!e.href||!s||i.nodeName.toLowerCase()!=="map"?!1:(o=r("img[usemap=#"+s+"]")[0],!!o&&o.is(":visible"))):/input|select|textarea|button|object/.test(n)?!e.disabled:"a"===n?e.href||t:t}function p(e){u.length<1&&e.length?e.not("body").blur():u.first().focus()}function d(e){if(!c.is(":visible"))return;var t=r(e.target),n=a.elements.tooltip,i=t.closest(k),o;o=i.length<1?s:parseInt(i[0].style.zIndex,10)>parseInt(n[0].style.zIndex,10),!o&&t.closest(k)[0]!==n[0]&&p(t),f=e.target===u[u.length-1]}var n=this,u={},a,f,l,c;r.extend(n,{init:function(){function i(){var e=r(this);c.css({height:e.height(),width:e.width()})}return c=n.elem=r("<div />",{id:"qtip-overlay",html:"<div></div>",mousedown:function(){return s}}).hide(),r(e).bind("resize"+G,i),i(),r(t.body).bind("focusin"+G,d),r(t).bind("keydown"+G,function(e){a&&a.options.show.modal.escape&&e.keyCode===27&&a.hide(e)}),c.bind("click"+G,function(e){a&&a.options.show.modal.blur&&a.hide(e)}),n},update:function(e){a=e,e.options.show.modal.stealfocus!==s?u=e.elements.tooltip.find("*").filter(function(){return h(this)}):u=[]},toggle:function(e,u,f){var h=r(t.body),d=e.elements.tooltip,v=e.options.show.modal,m=v.effect,g=u?"show":"hide",y=c.is(":visible"),b=r(Q).filter(":visible:not(:animated)").not(d),w;return n.update(e),u&&v.stealfocus!==s&&p(r(":focus")),c.toggleClass("blurs",v.blur),u&&c.css({left:0,top:0}).appendTo(t.body),c.is(":animated")&&y===u&&l!==s||!u&&b.length?n:(c.stop(i,s),r.isFunction(m)?m.call(c,u):m===s?c[g]():c.fadeTo(parseInt(f,10)||90,u?1:0,function(){u||c.hide()}),u||c.queue(function(e){c.css({left:"",top:""}),b.length||c.detach(),e()}),l=u,a.destroyed&&(a=o),n)}}),n.init()},J=new J,$=E.modal=function(e){var t=e.plugins.modal;return"object"==typeof t?t:e.plugins.modal=new Y(e)},$.sanitize=function(e){e.show&&(typeof e.show.modal!="object"?e.show.modal={on:!!e.show.modal}:typeof e.show.modal.on=="undefined"&&(e.show.modal.on=i))},$.zindex=w.zindex-200,$.initialize="render",r.extend(i,w.defaults,{show:{modal:{on:s,effect:i,blur:i,stealfocus:i,escape:i}}}),E.viewport=function(n,r,i,s,o,m,b){function j(e,t,n,i,s,o,u,a,f){var l=r[s],c=S[e],h=T[e],p=n===y,d=-O.offset[s]+A.offset[s]+A["scroll"+s],m=c===s?f:c===o?-f:-f/2,b=h===s?a:h===o?-a:-a/2,w=_&&_.size?_.size[u]||0:0,E=_&&_.corner&&_.corner.precedance===e&&!p?w:0,x=d-l+E,N=l+f-A[u]-d+E,C=m-(S.precedance===e||c===S[t]?b:0)-(h===v?a/2:0);return p?(E=_&&_.corner&&_.corner.precedance===t?w:0,C=(c===s?1:-1)*m-E,r[s]+=x>0?x:N>0?-N:0,r[s]=Math.max(-O.offset[s]+A.offset[s]+(E&&_.corner[e]===v?_.offset:0),l-C,Math.min(Math.max(-O.offset[s]+A.offset[s]+A[u],l+C),r[s]))):(i*=n===g?2:0,x>0&&(c!==s||N>0)?(r[s]-=C+i,H["invert"+e](s)):N>0&&(c!==o||x>0)&&(r[s]-=(c===v?-C:C)+i,H["invert"+e](o)),r[s]<d&&-r[s]>N&&(r[s]=l,H=S.clone())),r[s]-l}var w=i.target,E=n.elements.tooltip,S=i.my,T=i.at,N=i.adjust,C=N.method.split(" "),k=C[0],L=C[1]||C[0],A=i.viewport,O=i.container,M=n.cache,_=n.plugins.tip,D={left:0,top:0},P,H,B;if(!A.jquery||w[0]===e||w[0]===t.body||N.method==="none")return D;P=E.css("position")==="fixed",A={elem:A,height:A[(A[0]===e?"h":"outerH")+"eight"](),width:A[(A[0]===e?"w":"outerW")+"idth"](),scrollleft:P?0:A.scrollLeft(),scrolltop:P?0:A.scrollTop(),offset:A.offset()||{left:0,top:0}},O={elem:O,scrollLeft:O.scrollLeft(),scrollTop:O.scrollTop(),offset:O.offset()||{left:0,top:0}};if(k!=="shift"||L!=="shift")H=S.clone();return D={left:k!=="none"?j(u,a,k,N.x,h,d,f,s,m):0,top:L!=="none"?j(a,u,L,N.y,c,p,l,o,b):0},H&&M.lastClass!==(B=x+"-pos-"+H.abbrev())&&E.removeClass(n.cache.lastClass).addClass(n.cache.lastClass=B),D},E.imagemap=function(e,t,n,i){function E(e,t,n){var r=0,i=1,s=1,o=0,u=0,a=e.width,f=e.height;while(a>0&&f>0&&i>0&&s>0){a=Math.floor(a/2),f=Math.floor(f/2),n.x===h?i=a:n.x===d?i=e.width-a:i+=Math.floor(a/2),n.y===c?s=f:n.y===p?s=e.height-f:s+=Math.floor(f/2),r=t.length;while(r--){if(t.length<2)break;o=t[r][0]-e.position.left,u=t[r][1]-e.position.top,(n.x===h&&o>=i||n.x===d&&o<=i||n.x===v&&(o<i||o>e.width-i)||n.y===c&&u>=s||n.y===p&&u<=s||n.y===v&&(u<s||u>e.height-s))&&t.splice(r,1)}}return{left:t[0][0],top:t[0][1]}}t.jquery||(t=r(t));var s=e.cache.areas={},o=(t[0].shape||t.attr("shape")).toLowerCase(),u=t[0].coords||t.attr("coords"),a=u.split(","),f=[],l=r('img[usemap="#'+t.parent("map").attr("name")+'"]'),m=l.offset(),g={width:0,height:0,position:{top:1e10,right:0,bottom:0,left:1e10}},y=0,b=0,w;m.left+=Math.ceil((l.outerWidth()-l.width())/2),m.top+=Math.ceil((l.outerHeight()-l.height())/2);if(o==="poly"){y=a.length;while(y--)b=[parseInt(a[--y],10),parseInt(a[y+1],10)],b[0]>g.position.right&&(g.position.right=b[0]),b[0]<g.position.left&&(g.position.left=b[0]),b[1]>g.position.bottom&&(g.position.bottom=b[1]),b[1]<g.position.top&&(g.position.top=b[1]),f.push(b)}else{y=-1;while(y++<a.length)f.push(parseInt(a[y],10))}switch(o){case"rect":g={width:Math.abs(f[2]-f[0]),height:Math.abs(f[3]-f[1]),position:{left:Math.min(f[0],f[2]),top:Math.min(f[1],f[3])}};break;case"circle":g={width:f[2]+2,height:f[2]+2,position:{left:f[0],top:f[1]}};break;case"poly":g.width=Math.abs(g.position.right-g.position.left),g.height=Math.abs(g.position.bottom-g.position.top),n.abbrev()==="c"?g.position={left:g.position.left+g.width/2,top:g.position.top+g.height/2}:(s[n+u]||(g.position=E(g,f.slice(),n),i&&(i[0]==="flip"||i[1]==="flip")&&(g.offset=E(g,f.slice(),{x:n.x===h?d:n.x===d?h:v,y:n.y===c?p:n.y===p?c:v}),g.offset.left-=g.position.left,g.offset.top-=g.position.top),s[n+u]=g),g=s[n+u]),g.width=g.height=0}return g.position.left+=m.left,g.position.top+=m.top,g};var Z;Z=E.ie6=function(e){var t=e.plugins.ie6;return E.ie!==6?s:"object"==typeof t?t:e.plugins.ie6=new et(e)},Z.initialize="render"})})(window,document);// Spectrum Colorpicker v1.0.9
// https://github.com/bgrins/spectrum
// Author: Brian Grinstead
// License: MIT

(function (window, $, undefined) {
    var defaultOpts = {

        // Events
        beforeShow: noop,
        move: noop,
        change: noop,
        show: noop,
        hide: noop,

        // Options
        color: false,
        flat: false,
        showInput: false,
        showButtons: true,
        clickoutFiresChange: false,
        showInitial: false,
        showPalette: false,
        showPaletteOnly: false,
        showSelectionPalette: true,
        localStorageKey: false,
        maxSelectionSize: 7,
        cancelText: "cancel",
        chooseText: "choose",
        preferredFormat: false,
        className: "",
        showAlpha: false,
        theme: "sp-light",
        palette: ['fff', '000'],
        selectionPalette: [],
        disabled: false
    },
    spectrums = [],
    IE = !!/msie/i.exec( window.navigator.userAgent ),
    rgbaSupport = (function() {
        function contains( str, substr ) {
            return !!~('' + str).indexOf(substr);
        }

        var elem = document.createElement('div');
        var style = elem.style;
        style.cssText = 'background-color:rgba(0,0,0,.5)';
        return contains(style.backgroundColor, 'rgba') || contains(style.backgroundColor, 'hsla');
    })(),
    replaceInput = [
        "<div class='sp-replacer'>",
            "<div class='sp-preview'><div class='sp-preview-inner'></div></div>",
            "<div class='sp-dd'>&#9650;</div>",
        "</div>"
    ].join(''),
    markup = (function () {

        // IE does not support gradients with multiple stops, so we need to simulate
        //  that for the rainbow slider with 8 divs that each have a single gradient
        var gradientFix = "";
        if (IE) {
            for (var i = 1; i <= 6; i++) {
                gradientFix += "<div class='sp-" + i + "'></div>";
            }
        }

        return [
            "<div class='sp-container'>",
                "<div class='sp-palette-container'>",
                    "<div class='sp-palette sp-thumb sp-cf'></div>",
                "</div>",
                "<div class='sp-picker-container'>",
                    "<div class='sp-top sp-cf'>",
                        "<div class='sp-fill'></div>",
                        "<div class='sp-top-inner'>",
                            "<div class='sp-color'>",
                                "<div class='sp-sat'>",
                                    "<div class='sp-val'>",
                                        "<div class='sp-dragger'></div>",
                                    "</div>",
                                "</div>",
                            "</div>",
                            "<div class='sp-hue'>",
                                "<div class='sp-slider'></div>",
                                gradientFix,
                            "</div>",
                        "</div>",
                        "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>",
                    "</div>",
                    "<div class='sp-input-container sp-cf'>",
                        "<input class='sp-input' type='text' spellcheck='false'  />",
                    "</div>",
                    "<div class='sp-initial sp-thumb sp-cf'></div>",
                    "<div class='sp-button-container sp-cf'>",
                        "<a class='sp-cancel' href='#'></a>",
                        "<button class='sp-choose'></button>",
                    "</div>",
                "</div>",
            "</div>"
        ].join("");
    })();

    function paletteTemplate (p, color, className) {
        var html = [];
        for (var i = 0; i < p.length; i++) {
            var tiny = tinycolor(p[i]);
            var c = tiny.toHsl().l < 0.5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
            c += (tinycolor.equals(color, p[i])) ? " sp-thumb-active" : "";

            var swatchStyle = rgbaSupport ? ("background-color:" + tiny.toRgbString()) : "filter:" + tiny.toFilter();
            html.push('<span title="' + tiny.toRgbString() + '" data-color="' + tiny.toRgbString() + '" class="' + c + '"><span class="sp-thumb-inner" style="' + swatchStyle + ';" /></span>');
        }
        return "<div class='sp-cf " + className + "'>" + html.join('') + "</div>";
    }

    function hideAll() {
        for (var i = 0; i < spectrums.length; i++) {
            if (spectrums[i]) {
                spectrums[i].hide();
            }
        }
    }

    function instanceOptions(o, callbackContext) {
        var opts = $.extend({}, defaultOpts, o);
        opts.callbacks = {
            'move': bind(opts.move, callbackContext),
            'change': bind(opts.change, callbackContext),
            'show': bind(opts.show, callbackContext),
            'hide': bind(opts.hide, callbackContext),
            'beforeShow': bind(opts.beforeShow, callbackContext)
        };

        return opts;
    }

    function spectrum(element, o) {

        var opts = instanceOptions(o, element),
            flat = opts.flat,
            showSelectionPalette = opts.showSelectionPalette,
            localStorageKey = opts.localStorageKey,
            theme = opts.theme,
            callbacks = opts.callbacks,
            resize = throttle(reflow, 10),
            visible = false,
            dragWidth = 0,
            dragHeight = 0,
            dragHelperHeight = 0,
            slideHeight = 0,
            slideWidth = 0,
            alphaWidth = 0,
            alphaSlideHelperWidth = 0,
            slideHelperHeight = 0,
            currentHue = 0,
            currentSaturation = 0,
            currentValue = 0,
            currentAlpha = 1,
            palette = opts.palette.slice(0),
            paletteArray = $.isArray(palette[0]) ? palette : [palette],
            selectionPalette = opts.selectionPalette.slice(0),
            draggingClass = "sp-dragging";

        var doc = element.ownerDocument,
            body = doc.body,
            boundElement = $(element),
            disabled = false,
            container = $(markup, doc).addClass(theme),
            dragger = container.find(".sp-color"),
            dragHelper = container.find(".sp-dragger"),
            slider = container.find(".sp-hue"),
            slideHelper = container.find(".sp-slider"),
            alphaSliderInner = container.find(".sp-alpha-inner"),
            alphaSlider = container.find(".sp-alpha"),
            alphaSlideHelper = container.find(".sp-alpha-handle"),
            textInput = container.find(".sp-input"),
            paletteContainer = container.find(".sp-palette"),
            initialColorContainer = container.find(".sp-initial"),
            cancelButton = container.find(".sp-cancel"),
            chooseButton = container.find(".sp-choose"),
            isInput = boundElement.is("input"),
            shouldReplace = isInput && !flat,
            replacer = (shouldReplace) ? $(replaceInput).addClass(theme) : $([]),
            offsetElement = (shouldReplace) ? replacer : boundElement,
            previewElement = replacer.find(".sp-preview-inner"),
            initialColor = opts.color || (isInput && boundElement.val()),
            colorOnShow = false,
            preferredFormat = opts.preferredFormat,
            currentPreferredFormat = preferredFormat,
            clickoutFiresChange = !opts.showButtons || opts.clickoutFiresChange;


        function applyOptions() {

            container.toggleClass("sp-flat", flat);
            container.toggleClass("sp-input-disabled", !opts.showInput);
            container.toggleClass("sp-alpha-enabled", opts.showAlpha);
            container.toggleClass("sp-buttons-disabled", !opts.showButtons || flat);
            container.toggleClass("sp-palette-disabled", !opts.showPalette);
            container.toggleClass("sp-palette-only", opts.showPaletteOnly);
            container.toggleClass("sp-initial-disabled", !opts.showInitial);
            container.addClass(opts.className);

            reflow();
        }

        function initialize() {

            if (IE) {
                container.find("*:not(input)").attr("unselectable", "on");
            }

            applyOptions();

            if (shouldReplace) {
                //boundElement.hide().after(replacer);
                boundElement.parent().after(replacer);
            }

            if (flat) {
                boundElement.parent().after(container).hide();
            }
            else {
                $(body).append(container.hide());
            }

            if (localStorageKey && window.localStorage) {

                // Migrate old palettes over to new format.  May want to remove this eventually.
                try {
                    var oldPalette = window.localStorage[localStorageKey].split(",#");
                    if (oldPalette.length > 1) {
                        delete window.localStorage[localStorageKey];
                        $.each(oldPalette, function(i, c) {
                             addColorToSelectionPalette(c);
                        });
                    }
                }
                catch(e) { }

                try {
                    selectionPalette = window.localStorage[localStorageKey].split(";");
                }
                catch (e) { }
            }

            offsetElement.bind("click.spectrum touchstart.spectrum", function (e) {
                if (!disabled) {
                    toggle();
                }

                e.stopPropagation();

                if (!$(e.target).is("input")) {
                    e.preventDefault();
                }
            });

            if(boundElement.is(":disabled") || (opts.disabled === true)) {
                disable();
            }

            // Prevent clicks from bubbling up to document.  This would cause it to be hidden.
            container.click(stopPropagation);

            // Handle user typed input
            textInput.change(setFromTextInput);
            textInput.bind("paste", function () {
                setTimeout(setFromTextInput, 1);
            });
            textInput.keydown(function (e) { if (e.keyCode == 13) { setFromTextInput(); } });

            cancelButton.text(opts.cancelText);
            cancelButton.bind("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();
                hide("cancel");
            });

            chooseButton.text(opts.chooseText);
            chooseButton.bind("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();

                if (isValid()) {
                    updateOriginalInput(true);
                    hide();
                }
            });

            draggable(alphaSlider, function (dragX, dragY, e) {
                currentAlpha = (dragX / alphaWidth);
                if (e.shiftKey) {
                    currentAlpha = Math.round(currentAlpha * 10) / 10;
                }

                move();
            });

            draggable(slider, function (dragX, dragY) {
                currentHue = parseFloat(dragY / slideHeight);
                move();
            }, dragStart, dragStop);

            draggable(dragger, function (dragX, dragY) {
                currentSaturation = parseFloat(dragX / dragWidth);
                currentValue = parseFloat((dragHeight - dragY) / dragHeight);
                move();
            }, dragStart, dragStop);

            if (!!initialColor) {
                set(initialColor);

                // In case color was black - update the preview UI and set the format
                // since the set function will not run (default color is black).
                updateUI();
                currentPreferredFormat = preferredFormat || tinycolor(initialColor).format;

                addColorToSelectionPalette(initialColor);
            }
            else {
                updateUI();
            }

            if (flat) {
                show();
            }

            function palletElementClick(e) {
                if (e.data && e.data.ignore) {
                    set($(this).data("color"));
                    move();
                }
                else {
                    set($(this).data("color"));
                    updateOriginalInput(true);
                    move();
                    hide();
                }

                return false;
            }

            var paletteEvent = IE ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
            paletteContainer.delegate(".sp-thumb-el", paletteEvent, palletElementClick);
            initialColorContainer.delegate(".sp-thumb-el:nth-child(1)", paletteEvent, { ignore: true }, palletElementClick);
        }

        function addColorToSelectionPalette(color) {
            if (showSelectionPalette) {
                var colorRgb = tinycolor(color).toRgbString();
                if ($.inArray(colorRgb, selectionPalette) === -1) {
                    selectionPalette.push(colorRgb);
                }

                if (localStorageKey && window.localStorage) {
                    try {
                        window.localStorage[localStorageKey] = selectionPalette.join(";");
                    }
                    catch(e) { }
                }
            }
        }

        function getUniqueSelectionPalette() {
            var unique = [];
            var p = selectionPalette;
            var paletteLookup = {};
            var rgb;

            if (opts.showPalette) {

                for (var i = 0; i < paletteArray.length; i++) {
                    for (var j = 0; j < paletteArray[i].length; j++) {
                        rgb = tinycolor(paletteArray[i][j]).toRgbString();
                        paletteLookup[rgb] = true;
                    }
                }

                for (i = 0; i < p.length; i++) {
                    rgb = tinycolor(p[i]).toRgbString();

                    if (!paletteLookup.hasOwnProperty(rgb)) {
                        unique.push(p[i]);
                        paletteLookup[rgb] = true;
                    }
                }
            }

            return unique.reverse().slice(0, opts.maxSelectionSize);
        }

        function drawPalette() {

            var currentColor = get();

            var html = $.map(paletteArray, function (palette, i) {
                return paletteTemplate(palette, currentColor, "sp-palette-row sp-palette-row-" + i);
            });

            if (selectionPalette) {
                html.push(paletteTemplate(getUniqueSelectionPalette(), currentColor, "sp-palette-row sp-palette-row-selection"));
            }

            paletteContainer.html(html.join(""));
        }

        function drawInitial() {
            if (opts.showInitial) {
                var initial = colorOnShow;
                var current = get();
                initialColorContainer.html(paletteTemplate([initial, current], current, "sp-palette-row-initial"));
            }
        }

        function dragStart() {
            if (dragHeight === 0 || dragWidth === 0 || slideHeight === 0) {
                reflow();
            }
            container.addClass(draggingClass);
        }

        function dragStop() {
            container.removeClass(draggingClass);
        }

        function setFromTextInput() {
            var tiny = tinycolor(textInput.val());
            if (tiny.ok) {
                set(tiny);
            }
            else {
                textInput.addClass("sp-validation-error");
            }
        }

        function toggle() {
            if (visible) {
                hide();
            }
            else {
                show();
            }
        }

        function show() {
            if (visible) {
                reflow();
                return;
            }
            if (callbacks.beforeShow(get()) === false) return;

            hideAll();
            visible = true;

            $(doc).bind("click.spectrum", hide);
            $(window).bind("resize.spectrum", resize);
            replacer.addClass("sp-active");
            container.show();

            if (opts.showPalette) {
                drawPalette();
            }
            reflow();
            updateUI();

            colorOnShow = get();

            drawInitial();
            callbacks.show(colorOnShow);
        }

        function hide(e) {

            // Return on right click
            if (e && e.type == "click" && e.button == 2) { return; }

            // Return if hiding is unnecessary
            if (!visible || flat) { return; }
            visible = false;

            $(doc).unbind("click.spectrum", hide);
            $(window).unbind("resize.spectrum", resize);

            replacer.removeClass("sp-active");
            container.hide();

            var colorHasChanged = !tinycolor.equals(get(), colorOnShow);

            if (colorHasChanged) {
                if (clickoutFiresChange && e !== "cancel") {
                    updateOriginalInput(true);
                }
                else {
                    revert();
                }
            }

            callbacks.hide(get());
        }

        function revert() {
            set(colorOnShow, true);
        }

        function set(color, ignoreFormatChange) {
            if (tinycolor.equals(color, get())) {
                return;
            }

            var newColor = tinycolor(color);
            var newHsv = newColor.toHsv();

            currentHue = newHsv.h;
            currentSaturation = newHsv.s;
            currentValue = newHsv.v;
            currentAlpha = newHsv.a;

            updateUI();

            if (!ignoreFormatChange) {
                currentPreferredFormat = preferredFormat || newColor.format;
            }
        }

        function get() {
            return tinycolor.fromRatio({ h: currentHue, s: currentSaturation, v: currentValue, a: Math.round(currentAlpha * 100) / 100 });
        }

        function isValid() {
            return !textInput.hasClass("sp-validation-error");
        }

        function move() {
            updateUI();

            callbacks.move(get());
        }

        function updateUI() {

            textInput.removeClass("sp-validation-error");

            updateHelperLocations();

            // Update dragger background color (gradients take care of saturation and value).
            var flatColor = tinycolor({ h: currentHue, s: "1.0", v: "1.0" });
            dragger.css("background-color", '#'+flatColor.toHexString());

            // Get a format that alpha will be included in (hex and names ignore alpha)
            var format = currentPreferredFormat;
            if (currentAlpha < 1) {
                if (format === "hex" || format === "name") {
                    format = "rgb";
                }
            }

            var realColor = get(),
                realHex = realColor.toHexString(),
                realRgb = realColor.toRgbString();


            // Update the replaced elements background color (with actual selected color)
            if (rgbaSupport || realColor.alpha === 1) {
                previewElement.css("background-color", realRgb);
            }
            else {
                previewElement.css("background-color", "transparent");
                previewElement.css("filter", realColor.toFilter());
            }

            if (opts.showAlpha) {
                var rgb = realColor.toRgb();
                rgb.a = 0;
                var realAlpha = tinycolor(rgb).toRgbString();
                var gradient = "linear-gradient(left, " + realAlpha + ", " + realHex + ")";

                if (IE) {
                    alphaSliderInner.css("filter", tinycolor(realAlpha).toFilter({ gradientType: 1 }, realHex));
                }
                else {
                    alphaSliderInner.css("background", "-webkit-" + gradient);
                    alphaSliderInner.css("background", "-moz-" + gradient);
                    alphaSliderInner.css("background", "-ms-" + gradient);
                    alphaSliderInner.css("background", gradient);
                }
            }


            // Update the text entry input as it changes happen
            if (opts.showInput) {
                if (currentAlpha < 1) {
                    if (format === "hex" || format === "name") {
                        format = "rgb";
                    }
                }
                textInput.val(realColor.toString(format));
            }

            if (opts.showPalette) {
                drawPalette();
            }

            drawInitial();
        }

        function updateHelperLocations() {
            var s = currentSaturation;
            var v = currentValue;

            // Where to show the little circle in that displays your current selected color
            var dragX = s * dragWidth;
            var dragY = dragHeight - (v * dragHeight);
            dragX = Math.max(
                -dragHelperHeight,
                Math.min(dragWidth - dragHelperHeight, dragX - dragHelperHeight)
            );
            dragY = Math.max(
                -dragHelperHeight,
                Math.min(dragHeight - dragHelperHeight, dragY - dragHelperHeight)
            );
            dragHelper.css({
                "top": dragY,
                "left": dragX
            });

            var alphaX = currentAlpha * alphaWidth;
            alphaSlideHelper.css({
                "left": alphaX - (alphaSlideHelperWidth / 2)
            });

            // Where to show the bar that displays your current selected hue
            var slideY = (currentHue) * slideHeight;
            slideHelper.css({
                "top": slideY - slideHelperHeight
            });
        }

        function updateOriginalInput(fireCallback) {
            var color = get();

            if (isInput) {
                boundElement.val(color.toString(currentPreferredFormat)).change();
            }

            //var hasChanged = !tinycolor.equals(color, colorOnShow);
            var hasChanged = 1;
            
            colorOnShow = color;

            // Update the selection palette with the current color
            addColorToSelectionPalette(color);
            if (fireCallback && hasChanged) {
                callbacks.change(color);
            }
        }

        function reflow() {
            dragWidth = dragger.width();
            dragHeight = dragger.height();
            dragHelperHeight = dragHelper.height();
            slideWidth = slider.width();
            slideHeight = slider.height();
            slideHelperHeight = slideHelper.height();
            alphaWidth = alphaSlider.width();
            alphaSlideHelperWidth = alphaSlideHelper.width();

            if (!flat) {
                container.offset(getOffset(container, offsetElement));
            }

            updateHelperLocations();
        }

        function destroy() {
            boundElement.show();
            offsetElement.unbind("click.spectrum touchstart.spectrum");
            container.remove();
            replacer.remove();
            spectrums[spect.id] = null;
        }

        function option(optionName, optionValue) {
            if (optionName === undefined) {
                return $.extend({}, opts);
            }
            if (optionValue === undefined) {
                return opts[optionName];
            }

            opts[optionName] = optionValue;
            applyOptions();
        }

        function enable() {
            disabled = false;
            boundElement.attr("disabled", false);
            offsetElement.removeClass("sp-disabled");
        }

        function disable() {
            hide();
            disabled = true;
            boundElement.attr("disabled", true);
            offsetElement.addClass("sp-disabled");
        }

        initialize();

        var spect = {
            show: show,
            hide: hide,
            toggle: toggle,
            reflow: reflow,
            option: option,
            enable: enable,
            disable: disable,
            set: function (c) {
                set(c);
                updateOriginalInput();
            },
            get: get,
            destroy: destroy,
            container: container
        };

        spect.id = spectrums.push(spect) - 1;

        return spect;
    }

    /**
    * checkOffset - get the offset below/above and left/right element depending on screen position
    * Thanks https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.datepicker.js
    */
    function getOffset(picker, input) {
        var extraY = 0;
        var dpWidth = picker.outerWidth();
        var dpHeight = picker.outerHeight();
        var inputHeight = input.outerHeight();
        var doc = picker[0].ownerDocument;
        var docElem = doc.documentElement;
        var viewWidth = docElem.clientWidth + $(doc).scrollLeft();
        var viewHeight = docElem.clientHeight + $(doc).scrollTop();
        var offset = input.offset();
        offset.top += inputHeight;

        offset.left -=
            Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
            Math.abs(offset.left + dpWidth - viewWidth) : 0);

        offset.top -=
            Math.min(offset.top, ((offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
            Math.abs(dpHeight + inputHeight - extraY) : extraY));

        return offset;
    }

    /**
    * noop - do nothing
    */
    function noop() {

    }

    /**
    * stopPropagation - makes the code only doing this a little easier to read in line
    */
    function stopPropagation(e) {
        e.stopPropagation();
    }

    /**
    * Create a function bound to a given object
    * Thanks to underscore.js
    */
    function bind(func, obj) {
        var slice = Array.prototype.slice;
        var args = slice.call(arguments, 2);
        return function () {
            return func.apply(obj, args.concat(slice.call(arguments)));
        };
    }

    /**
    * Lightweight drag helper.  Handles containment within the element, so that
    * when dragging, the x is within [0,element.width] and y is within [0,element.height]
    */
    function draggable(element, onmove, onstart, onstop) {
        onmove = onmove || function () { };
        onstart = onstart || function () { };
        onstop = onstop || function () { };
        var doc = element.ownerDocument || document;
        var dragging = false;
        var offset = {};
        var maxHeight = 0;
        var maxWidth = 0;
        var hasTouch = ('ontouchstart' in window);

        var duringDragEvents = {};
        duringDragEvents["selectstart"] = prevent;
        duringDragEvents["dragstart"] = prevent;
        duringDragEvents[(hasTouch ? "touchmove" : "mousemove")] = move;
        duringDragEvents[(hasTouch ? "touchend" : "mouseup")] = stop;

        function prevent(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        }

        function move(e) {
            if (dragging) {
                // Mouseup happened outside of window
                if (IE && document.documentMode < 9 && !e.button) {
                    return stop();
                }

                var touches = e.originalEvent.touches;
                var pageX = touches ? touches[0].pageX : e.pageX;
                var pageY = touches ? touches[0].pageY : e.pageY;

                var dragX = Math.max(0, Math.min(pageX - offset.left, maxWidth));
                var dragY = Math.max(0, Math.min(pageY - offset.top, maxHeight));

                if (hasTouch) {
                    // Stop scrolling in iOS
                    prevent(e);
                }

                onmove.apply(element, [dragX, dragY, e]);
            }
        }
        function start(e) {
            var rightclick = (e.which) ? (e.which == 3) : (e.button == 2);
            var touches = e.originalEvent.touches;

            if (!rightclick && !dragging) {
                if (onstart.apply(element, arguments) !== false) {
                    dragging = true;
                    maxHeight = $(element).height();
                    maxWidth = $(element).width();
                    offset = $(element).offset();

                    $(doc).bind(duringDragEvents);
                    $(doc.body).addClass("sp-dragging");

                    if (!hasTouch) {
                        move(e);
                    }

                    prevent(e);
                }
            }
        }
        function stop() {
            if (dragging) {
                $(doc).unbind(duringDragEvents);
                $(doc.body).removeClass("sp-dragging");
                onstop.apply(element, arguments);
            }
            dragging = false;
        }

        $(element).bind(hasTouch ? "touchstart" : "mousedown", start);
    }

    function throttle(func, wait, debounce) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var throttler = function () {
                timeout = null;
                func.apply(context, args);
            };
            if (debounce) clearTimeout(timeout);
            if (debounce || !timeout) timeout = setTimeout(throttler, wait);
        };
    }


    /**
    * Define a jQuery plugin
    */
    var dataID = "spectrum.id";
    $.fn.spectrum = function (opts, extra) {

        if (typeof opts == "string") {

            var returnValue = this;
            var args = Array.prototype.slice.call( arguments, 1 );

            this.each(function () {
                var spect = spectrums[$(this).data(dataID)];
                if (spect) {

                    var method = spect[opts];
                    if (!method) {
                        throw new Error( "Spectrum: no such method: '" + opts + "'" );
                    }

                    if (opts == "get") {
                        returnValue = spect.get();
                    }
                    else if (opts == "container") {
                        returnValue = spect.container;
                    }
                    else if (opts == "option") {
                        returnValue = spect.option.apply(spect, args);
                    }
                    else if (opts == "destroy") {
                        spect.destroy();
                        $(this).removeData(dataID);
                    }
                    else {
                        method.apply(spect, args);
                    }
                }
            });

            return returnValue;
        }

        // Initializing a new instance of spectrum
        return this.spectrum("destroy").each(function () {
            var spect = spectrum(this, opts);
            $(this).data(dataID, spect.id);
        });
    };

    $.fn.spectrum.load = true;
    $.fn.spectrum.loadOpts = {};
    $.fn.spectrum.draggable = draggable;
    $.fn.spectrum.defaults = defaultOpts;

    $.spectrum = { };
    $.spectrum.localization = { };
    $.spectrum.palettes = { };

    $.fn.spectrum.processNativeColorInputs = function () {
        var colorInput = $("<input type='color' value='!' />")[0];
        var supportsColor = colorInput.type === "color" && colorInput.value != "!";

        if (!supportsColor) {
            $("input[type=color]").spectrum({
                preferredFormat: "hex6"
            });
        }
    };

    // TinyColor.js - <https://github.com/bgrins/TinyColor> - 2011 Brian Grinstead - v0.5

    (function (window) {

        var trimLeft = /^[\s,#]+/,
        trimRight = /\s+$/,
        tinyCounter = 0,
        math = Math,
        mathRound = math.round,
        mathMin = math.min,
        mathMax = math.max,
        mathRandom = math.random,
        parseFloat = window.parseFloat;

        function tinycolor(color, opts) {

            // If input is already a tinycolor, return itself
            if (typeof color == "object" && color.hasOwnProperty("_tc_id")) {
                return color;
            }

            var rgb = inputToRGB(color);
            var r = rgb.r, g = rgb.g, b = rgb.b, a = parseFloat(rgb.a), format = rgb.format;

            return {
                ok: rgb.ok,
                format: format,
                _tc_id: tinyCounter++,
                alpha: a,
                toHsv: function () {
                    var hsv = rgbToHsv(r, g, b);
                    return { h: hsv.h, s: hsv.s, v: hsv.v, a: a };
                },
                toHsvString: function () {
                    var hsv = rgbToHsv(r, g, b);
                    var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
                    return (a == 1) ?
                  "hsv(" + h + ", " + s + "%, " + v + "%)" :
                  "hsva(" + h + ", " + s + "%, " + v + "%, " + a + ")";
                },
                toHsl: function () {
                    var hsl = rgbToHsl(r, g, b);
                    return { h: hsl.h, s: hsl.s, l: hsl.l, a: a };
                },
                toHslString: function () {
                    var hsl = rgbToHsl(r, g, b);
                    var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
                    return (a == 1) ?
                  "hsl(" + h + ", " + s + "%, " + l + "%)" :
                  "hsla(" + h + ", " + s + "%, " + l + "%, " + a + ")";
                },
                toHex: function () {
                    return rgbToHex(r, g, b);
                },
                toHexString: function (force6Char) {
                    return rgbToHex(r, g, b, force6Char);
                },
                toHexString8: function () {
                    return rgbToHex(r, g, b, true)+pad2(mathRound(a*255).toString(16));
                },
                toRgb: function () {
                    return { r: mathRound(r), g: mathRound(g), b: mathRound(b), a: a };
                },
                toRgbString: function () {
                    return (a == 1) ?
                  "rgb(" + mathRound(r) + ", " + mathRound(g) + ", " + mathRound(b) + ")" :
                  "rgba(" + mathRound(r) + ", " + mathRound(g) + ", " + mathRound(b) + ", " + a + ")";
                },
                toName: function () {
                    return hexNames[rgbToHex(r, g, b)] || false;
                },
                toFilter: function (opts, secondColor) {

                    var hex = rgbToHex(r, g, b, true);
                    var secondHex = hex;
                    var alphaHex = Math.round(parseFloat(a) * 255).toString(16);
                    var secondAlphaHex = alphaHex;
                    var gradientType = opts && opts.gradientType ? "GradientType = 1, " : "";

                    if (secondColor) {
                        var s = tinycolor(secondColor);
                        secondHex = s.toHex();
                        secondAlphaHex = Math.round(parseFloat(s.alpha) * 255).toString(16);
                    }

                    return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr=#" + pad2(alphaHex) + hex + ",endColorstr=#" + pad2(secondAlphaHex) + secondHex + ")";
                },
                toString: function (format) {
                    format = format || this.format;
                    var formattedString = false;
                    if (format === "rgb") {
                        formattedString = this.toRgbString();
                    }
                    if (format === "hex") {
                        formattedString = this.toHexString();
                    }
                    if (format === "hex6") {
                        formattedString = this.toHexString(true);
                    }
                    if (format === "hex8") {
                        formattedString = this.toHexString8();
                    }
                    if (format === "name") {
                        formattedString = this.toName();
                    }
                    if (format === "hsl") {
                        formattedString = this.toHslString();
                    }
                    if (format === "hsv") {
                        formattedString = this.toHsvString();
                    }

                    return formattedString || this.toHexString(true);
                }
            };
        }

        // If input is an object, force 1 into "1.0" to handle ratios properly
        // String input requires "1.0" as input, so 1 will be treated as 1
        tinycolor.fromRatio = function (color) {

            if (typeof color == "object") {
                for (var i in color) {
                    if (color[i] === 1) {
                        color[i] = "1.0";
                    }
                }
            }

            return tinycolor(color);

        };

        // Given a string or object, convert that input to RGB
        // Possible string inputs:
        //
        //     "red"
        //     "#f00" or "f00"
        //     "#ff0000" or "ff0000"
        //     "rgb 255 0 0" or "rgb (255, 0, 0)"
        //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
        //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
        //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
        //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
        //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
        //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
        //
        function inputToRGB(color) {

            var rgb = { r: 0, g: 0, b: 0 };
            var a = 1;
            var ok = false;
            var format = false;

            if (typeof color == "string") {
                color = stringInputToObject(color);
            }

            if (typeof color == "object") {
                if (color.hasOwnProperty("r") && color.hasOwnProperty("g") && color.hasOwnProperty("b")) {
                    rgb = rgbToRgb(color.r, color.g, color.b);
                    ok = true;
                    format = "rgb";
                }
                else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("v")) {
                    rgb = hsvToRgb(color.h, color.s, color.v);
                    ok = true;
                    format = "hsv";
                }
                else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("l")) {
                    rgb = hslToRgb(color.h, color.s, color.l);
                    ok = true;
                    format = "hsl";
                }

                if (color.hasOwnProperty("a")) {
                    a = color.a;
                }
            }

            rgb.r = mathMin(255, mathMax(rgb.r, 0));
            rgb.g = mathMin(255, mathMax(rgb.g, 0));
            rgb.b = mathMin(255, mathMax(rgb.b, 0));


            // Don't let the range of [0,255] come back in [0,1].
            // Potentially lose a little bit of precision here, but will fix issues where
            // .5 gets interpreted as half of the total, instead of half of 1.
            // If it was supposed to be 128, this was already taken care of in the conversion function
            if (rgb.r < 1) { rgb.r = mathRound(rgb.r); }
            if (rgb.g < 1) { rgb.g = mathRound(rgb.g); }
            if (rgb.b < 1) { rgb.b = mathRound(rgb.b); }

            return {
                ok: ok,
                format: (color && color.format) || format,
                r: rgb.r,
                g: rgb.g,
                b: rgb.b,
                a: a
            };
        }



        // Conversion Functions
        // --------------------

        // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
        // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

        // `rgbToRgb`
        // Handle bounds / percentage checking to conform to CSS color spec
        // <http://www.w3.org/TR/css3-color/>
        // *Assumes:* r, g, b in [0, 255] or [0, 1]
        // *Returns:* { r, g, b } in [0, 255]
        function rgbToRgb(r, g, b) {
            return {
                r: bound01(r, 255) * 255,
                g: bound01(g, 255) * 255,
                b: bound01(b, 255) * 255
            };
        }

        // `rgbToHsl`
        // Converts an RGB color value to HSL.
        // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
        // *Returns:* { h, s, l } in [0,1]
        function rgbToHsl(r, g, b) {

            r = bound01(r, 255);
            g = bound01(g, 255);
            b = bound01(b, 255);

            var max = mathMax(r, g, b), min = mathMin(r, g, b);
            var h, s, l = (max + min) / 2;

            if (max == min) {
                h = s = 0; // achromatic
            }
            else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }

                h /= 6;
            }

            return { h: h, s: s, l: l };
        }

        // `hslToRgb`
        // Converts an HSL color value to RGB.
        // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
        // *Returns:* { r, g, b } in the set [0, 255]
        function hslToRgb(h, s, l) {
            var r, g, b;

            h = bound01(h, 360);
            s = bound01(s, 100);
            l = bound01(l, 100);

            function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            if (s === 0) {
                r = g = b = l; // achromatic
            }
            else {
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }

            return { r: r * 255, g: g * 255, b: b * 255 };
        }

        // `rgbToHsv`
        // Converts an RGB color value to HSV
        // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
        // *Returns:* { h, s, v } in [0,1]
        function rgbToHsv(r, g, b) {

            r = bound01(r, 255);
            g = bound01(g, 255);
            b = bound01(b, 255);

            var max = mathMax(r, g, b), min = mathMin(r, g, b);
            var h, s, v = max;

            var d = max - min;
            s = max === 0 ? 0 : d / max;

            if (max == min) {
                h = 0; // achromatic
            }
            else {
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            return { h: h, s: s, v: v };
        }

        // `hsvToRgb`
        // Converts an HSV color value to RGB.
        // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
        // *Returns:* { r, g, b } in the set [0, 255]
        function hsvToRgb(h, s, v) {
            h = bound01(h, 360) * 6;
            s = bound01(s, 100);
            v = bound01(v, 100);

            var i = math.floor(h),
                f = h - i,
                p = v * (1 - s),
                q = v * (1 - f * s),
                t = v * (1 - (1 - f) * s),
                mod = i % 6,
                r = [v, q, p, p, t, v][mod],
                g = [t, v, v, q, p, p][mod],
                b = [p, p, t, v, v, q][mod];

            return { r: r * 255, g: g * 255, b: b * 255 };
        }

        // `rgbToHex`
        // Converts an RGB color to hex
        // Assumes r, g, and b are contained in the set [0, 255]
        // Returns a 3 or 6 character hex
        function rgbToHex(r, g, b, force6Char) {

            var hex = [
                pad2(mathRound(r).toString(16)),
                pad2(mathRound(g).toString(16)),
                pad2(mathRound(b).toString(16))
            ];

            // Return a 3 character hex if possible
            if (!force6Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
                return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
            }

            return hex.join("");
        }

        // `equals`
        // Can be called with any tinycolor input
        tinycolor.equals = function (color1, color2) {
            if (!color1 || !color2) { return false; }
            return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
        };
        tinycolor.random = function () {
            return tinycolor.fromRatio({
                r: mathRandom(),
                g: mathRandom(),
                b: mathRandom()
            });
        };


        // Modification Functions
        // ----------------------
        // Thanks to less.js for some of the basics here
        // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>


        tinycolor.desaturate = function (color, amount) {
            var hsl = tinycolor(color).toHsl();
            hsl.s -= ((amount || 10) / 100);
            hsl.s = clamp01(hsl.s);
            return tinycolor(hsl);
        };
        tinycolor.saturate = function (color, amount) {
            var hsl = tinycolor(color).toHsl();
            hsl.s += ((amount || 10) / 100);
            hsl.s = clamp01(hsl.s);
            return tinycolor(hsl);
        };
        tinycolor.greyscale = function (color) {
            return tinycolor.desaturate(color, 100);
        };
        tinycolor.lighten = function (color, amount) {
            var hsl = tinycolor(color).toHsl();
            hsl.l += ((amount || 10) / 100);
            hsl.l = clamp01(hsl.l);
            return tinycolor(hsl);
        };
        tinycolor.darken = function (color, amount) {
            var hsl = tinycolor(color).toHsl();
            hsl.l -= ((amount || 10) / 100);
            hsl.l = clamp01(hsl.l);
            return tinycolor(hsl);
        };
        tinycolor.complement = function (color) {
            var hsl = tinycolor(color).toHsl();
            hsl.h = (hsl.h + 0.5) % 1;
            return tinycolor(hsl);
        };


        // Combination Functions
        // ---------------------
        // Thanks to jQuery xColor for some of the ideas behind these
        // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

        tinycolor.triad = function (color) {
            var hsl = tinycolor(color).toHsl();
            var h = hsl.h * 360;
            return [
            tinycolor(color),
            tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
            tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
        ];
        };
        tinycolor.tetrad = function (color) {
            var hsl = tinycolor(color).toHsl();
            var h = hsl.h * 360;
            return [
            tinycolor(color),
            tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
            tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
            tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
        ];
        };
        tinycolor.splitcomplement = function (color) {
            var hsl = tinycolor(color).toHsl();
            var h = hsl.h * 360;
            return [
            tinycolor(color),
            tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
            tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })
        ];
        };
        tinycolor.analogous = function (color, results, slices) {
            results = results || 6;
            slices = slices || 30;

            var hsl = tinycolor(color).toHsl();
            var part = 360 / slices;
            var ret = [tinycolor(color)];

            hsl.h *= 360;

            for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
                hsl.h = (hsl.h + part) % 360;
                ret.push(tinycolor(hsl));
            }
            return ret;
        };
        tinycolor.monochromatic = function (color, results) {
            results = results || 6;
            var hsv = tinycolor(color).toHsv();
            var h = hsv.h, s = hsv.s, v = hsv.v;
            var ret = [];
            var modification = 1 / results;

            while (results--) {
                ret.push(tinycolor({ h: h, s: s, v: v }));
                v = (v + modification) % 1;
            }

            return ret;
        };
        tinycolor.readable = function (color1, color2) {
            var a = tinycolor(color1).toRgb(), b = tinycolor(color2).toRgb();
            return (
            (b.r - a.r) * (b.r - a.r) +
            (b.g - a.g) * (b.g - a.g) +
            (b.b - a.b) * (b.b - a.b)
        ) > 0x28A4;
        };

        // Big List of Colors
        // ---------
        // <http://www.w3.org/TR/css3-color/#svg-color>
        var names = tinycolor.names = {
            aliceblue: "f0f8ff",
            antiquewhite: "faebd7",
            aqua: "0ff",
            aquamarine: "7fffd4",
            azure: "f0ffff",
            beige: "f5f5dc",
            bisque: "ffe4c4",
            black: "000",
            blanchedalmond: "ffebcd",
            blue: "00f",
            blueviolet: "8a2be2",
            brown: "a52a2a",
            burlywood: "deb887",
            burntsienna: "ea7e5d",
            cadetblue: "5f9ea0",
            chartreuse: "7fff00",
            chocolate: "d2691e",
            coral: "ff7f50",
            cornflowerblue: "6495ed",
            cornsilk: "fff8dc",
            crimson: "dc143c",
            cyan: "0ff",
            darkblue: "00008b",
            darkcyan: "008b8b",
            darkgoldenrod: "b8860b",
            darkgray: "a9a9a9",
            darkgreen: "006400",
            darkgrey: "a9a9a9",
            darkkhaki: "bdb76b",
            darkmagenta: "8b008b",
            darkolivegreen: "556b2f",
            darkorange: "ff8c00",
            darkorchid: "9932cc",
            darkred: "8b0000",
            darksalmon: "e9967a",
            darkseagreen: "8fbc8f",
            darkslateblue: "483d8b",
            darkslategray: "2f4f4f",
            darkslategrey: "2f4f4f",
            darkturquoise: "00ced1",
            darkviolet: "9400d3",
            deeppink: "ff1493",
            deepskyblue: "00bfff",
            dimgray: "696969",
            dimgrey: "696969",
            dodgerblue: "1e90ff",
            firebrick: "b22222",
            floralwhite: "fffaf0",
            forestgreen: "228b22",
            fuchsia: "f0f",
            gainsboro: "dcdcdc",
            ghostwhite: "f8f8ff",
            gold: "ffd700",
            goldenrod: "daa520",
            gray: "808080",
            green: "008000",
            greenyellow: "adff2f",
            grey: "808080",
            honeydew: "f0fff0",
            hotpink: "ff69b4",
            indianred: "cd5c5c",
            indigo: "4b0082",
            ivory: "fffff0",
            khaki: "f0e68c",
            lavender: "e6e6fa",
            lavenderblush: "fff0f5",
            lawngreen: "7cfc00",
            lemonchiffon: "fffacd",
            lightblue: "add8e6",
            lightcoral: "f08080",
            lightcyan: "e0ffff",
            lightgoldenrodyellow: "fafad2",
            lightgray: "d3d3d3",
            lightgreen: "90ee90",
            lightgrey: "d3d3d3",
            lightpink: "ffb6c1",
            lightsalmon: "ffa07a",
            lightseagreen: "20b2aa",
            lightskyblue: "87cefa",
            lightslategray: "789",
            lightslategrey: "789",
            lightsteelblue: "b0c4de",
            lightyellow: "ffffe0",
            lime: "0f0",
            limegreen: "32cd32",
            linen: "faf0e6",
            magenta: "f0f",
            maroon: "800000",
            mediumaquamarine: "66cdaa",
            mediumblue: "0000cd",
            mediumorchid: "ba55d3",
            mediumpurple: "9370db",
            mediumseagreen: "3cb371",
            mediumslateblue: "7b68ee",
            mediumspringgreen: "00fa9a",
            mediumturquoise: "48d1cc",
            mediumvioletred: "c71585",
            midnightblue: "191970",
            mintcream: "f5fffa",
            mistyrose: "ffe4e1",
            moccasin: "ffe4b5",
            navajowhite: "ffdead",
            navy: "000080",
            oldlace: "fdf5e6",
            olive: "808000",
            olivedrab: "6b8e23",
            orange: "ffa500",
            orangered: "ff4500",
            orchid: "da70d6",
            palegoldenrod: "eee8aa",
            palegreen: "98fb98",
            paleturquoise: "afeeee",
            palevioletred: "db7093",
            papayawhip: "ffefd5",
            peachpuff: "ffdab9",
            peru: "cd853f",
            pink: "ffc0cb",
            plum: "dda0dd",
            powderblue: "b0e0e6",
            purple: "800080",
            red: "f00",
            rosybrown: "bc8f8f",
            royalblue: "4169e1",
            saddlebrown: "8b4513",
            salmon: "fa8072",
            sandybrown: "f4a460",
            seagreen: "2e8b57",
            seashell: "fff5ee",
            sienna: "a0522d",
            silver: "c0c0c0",
            skyblue: "87ceeb",
            slateblue: "6a5acd",
            slategray: "708090",
            slategrey: "708090",
            snow: "fffafa",
            springgreen: "00ff7f",
            steelblue: "4682b4",
            tan: "d2b48c",
            teal: "008080",
            thistle: "d8bfd8",
            tomato: "ff6347",
            turquoise: "40e0d0",
            violet: "ee82ee",
            wheat: "f5deb3",
            white: "fff",
            whitesmoke: "f5f5f5",
            yellow: "ff0",
            yellowgreen: "9acd32"
        };

        // Make it easy to access colors via `hexNames[hex]`
        var hexNames = tinycolor.hexNames = flip(names);


        // Utilities
        // ---------

        // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
        function flip(o) {
            var flipped = {};
            for (var i in o) {
                if (o.hasOwnProperty(i)) {
                    flipped[o[i]] = i;
                }
            }
            return flipped;
        }

        // Take input from [0, n] and return it as [0, 1]
        function bound01(n, max) {
            if (isOnePointZero(n)) { n = "100%"; }

            var processPercent = isPercentage(n);
            n = mathMin(max, mathMax(0, parseFloat(n)));

            // Automatically convert percentage into number
            if (processPercent) {
                n = n * (max / 100);
            }

            // Handle floating point rounding errors
            if (math.abs(n - max) < 0.000001) {
                return 1;
            }
            else if (n >= 1) {
                return (n % max) / parseFloat(max);
            }
            return n;
        }

        // Force a number between 0 and 1
        function clamp01(val) {
            return mathMin(1, mathMax(0, val));
        }

        // Parse an integer into hex
        function parseHex(val) {
            return parseInt(val, 16);
        }

        // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
        // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
        function isOnePointZero(n) {
            return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
        }

        // Check to see if string passed in is a percentage
        function isPercentage(n) {
            return typeof n === "string" && n.indexOf('%') != -1;
        }

        // Force a hex value to have 2 characters
        function pad2(c) {
            return c.length == 1 ? '0' + c : '' + c;
        }

        var matchers = (function () {

            // <http://www.w3.org/TR/css3-values/#integers>
            var CSS_INTEGER = "[-\\+]?\\d+%?";

            // <http://www.w3.org/TR/css3-values/#number-value>
            var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

            // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
            var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

            // Actual matching.
            // Parentheses and commas are optional, but not required.
            // Whitespace can take the place of commas or opening paren
            var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
            var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

            return {
                rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
                rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
                hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
                hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
                hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
                hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
            };
        })();

        // `stringInputToObject`
        // Permissive string parsing.  Take in a number of formats, and output an object
        // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
        function stringInputToObject(color) {

            color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
            var named = false;
            if (names[color]) {
                color = names[color];
                named = true;
            }
            else if (color == 'transparent') {
                return { r: 0, g: 0, b: 0, a: 0 };
            }

            // Try to match string input using regular expressions.
            // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
            // Just return an object and let the conversion functions handle that.
            // This way the result will be the same whether the tinycolor is initialized with string or object.
            var match;
            if ((match = matchers.rgb.exec(color))) {
                return { r: match[1], g: match[2], b: match[3] };
            }
            if ((match = matchers.rgba.exec(color))) {
                return { r: match[1], g: match[2], b: match[3], a: match[4] };
            }
            if ((match = matchers.hsl.exec(color))) {
                return { h: match[1], s: match[2], l: match[3] };
            }
            if ((match = matchers.hsla.exec(color))) {
                return { h: match[1], s: match[2], l: match[3], a: match[4] };
            }
            if ((match = matchers.hsv.exec(color))) {
                return { h: match[1], s: match[2], v: match[3] };
            }
            if ((match = matchers.hex6.exec(color))) {
                return {
                    r: parseHex(match[1]),
                    g: parseHex(match[2]),
                    b: parseHex(match[3]),
                    format: named ? "name" : "hex"
                };
            }
            if ((match = matchers.hex8.exec(color))) {
                return {
                    r: parseHex(match[1]),
                    g: parseHex(match[2]),
                    b: parseHex(match[3]),
                    a: parseHex(match[4])/255,
                    format: named ? "name" : "hex"
                };
            }
            if ((match = matchers.hex3.exec(color))) {
                return {
                    r: parseHex(match[1] + '' + match[1]),
                    g: parseHex(match[2] + '' + match[2]),
                    b: parseHex(match[3] + '' + match[3]),
                    format: named ? "name" : "hex"
                };
            }

            return false;
        }

        // Everything is ready, expose to window
        window.tinycolor = tinycolor;

    })(this);

    $(function () {
        if ($.fn.spectrum.load) {
            $.fn.spectrum.processNativeColorInputs();
        }
    });

})(window, jQuery);


(function(dojo){ dojo.addOnLoad(function(){
                new NextendForm({
                  container: "nextend-configurator-wp",
                  data: {"manual":"http:\/\/www.nextendweb.com\/wiki\/accordion-menu-documentation\/","support":"http:\/\/www.nextendweb.com\/accordion-menu\/#support","type":"wordpress","wordpressmenu_0":"189","wordpressmenu":"189|*|0","theme":"default","skins":"","margin":"0|*|0|*|10|*|0|*|px","level1margin":"0|*|0|*|0|*|0|*|px","level1padding":"2|*|0|*|2|*|20|*|px","level1border":"0|*|0|*|1|*|0|*|px|*|e0e0e0|*|solid","level1minus":"exp2.png|*|left|*|d66060ff|*|1","level1plus":"exp2.png|*|left|*|57883bff|*|1","level2margin":"0|*|0|*|0|*|15|*|px","level2padding":"2|*|0|*|2|*|20|*|px","level2border":"0|*|0|*|1|*|0|*|px|*|e0e0e0|*|solid","level2minus":"exp2.png|*|left|*|d66060ff|*|1","level2plus":"exp2.png|*|left|*|57883bff|*|1","level3margin":"0|*|0|*|0|*|30|*|px","level3padding":"2|*|0|*|2|*|20|*|px","level3border":"0|*|0|*|1|*|0|*|px|*|e0e0e0|*|solid","level3minus":"exp2.png|*|left|*|d66060ff|*|1","level3plus":"exp2.png|*|left|*|57883bff|*|1","level4margin":"0|*|0|*|0|*|45|*|px","level4padding":"2|*|0|*|2|*|20|*|px","level4border":"0|*|0|*|1|*|0|*|px|*|e0e0e0|*|solid","level4minus":"exp2.png|*|left|*|d66060ff|*|1","level4plus":"exp2.png|*|left|*|57883bff|*|1","level5margin":"0|*|0|*|0|*|60|*|px","level5padding":"2|*|0|*|2|*|20|*|px","level5border":"0|*|0|*|1|*|0|*|px|*|e0e0e0|*|solid","level5minus":"exp2.png|*|left|*|d66060ff|*|1","level5plus":"exp2.png|*|left|*|57883bff|*|1","slice":"0|*|0|*|0","animation":"500|*|dojo.fx.easing.cubicInOut|*|dojo.fx.easing.cubicInOut"},
                  xml: "C:/xampp/htdocs/wp-content/plugins/nextend-accordion-menu/configuration.xml",
                  control_name: "nextend",
                  url: "http://localhost/wp-admin/admin-ajax.php?action=nextend",
                  loadedJSS: ["C:\\xampp\\htdocs\/C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\javascript\/dojo\/1.6.1\/dojo\/dojo.js","C:\\xampp\\htdocs\/C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\javascript\/dojo\/1.6.1\/dojo\/window.js","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\js\\window.js","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\js\\element.js","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\js\\element\/list.js","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\js\\element\/subform.js","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\js\\element\/menuwithitems.js","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\js\\element\/mixed.js","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\js\\element\/onoff.js","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\js\\element\/skin.js","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\js\\element\/fontmanager.js","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\js\\fontmanager.js","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\js\\element\/text.js","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\js\\element\/color.js","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\js\\element\/switcher.js","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\js\\element\/checkbox.js","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\js\\element\/radio.js","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\js\\form.js","C:\\xampp\\htdocs\/C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\javascript\/jquery\/1.9.1\/uacss.js","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\js\\jquery.qtip.min.js","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\js\\spectrum.js"],
                  loadedCSS: {"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\wordpress\/removeslug.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\wordpress\/removeslug.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\common.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\common.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\window.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\window.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\configurator.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\configurator.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\jquery.qtip.min.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\jquery.qtip.min.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\form.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\form.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/subform.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/subform.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/mixed.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/mixed.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/onoff.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/onoff.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/fontmanager.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/fontmanager.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\fontmanager.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\fontmanager.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\tabs\/horizontal.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\tabs\/horizontal.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/text.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/text.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\spectrum.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\spectrum.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/color.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/color.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/switcher.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/switcher.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/checkbox.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/checkbox.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/decoration.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/decoration.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/textalign.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/textalign.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/radio.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/radio.css","C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/imagelist.css":"C:\\xampp\\htdocs\\wp-content\\plugins\\nextend-accordion-menu\\nextend\\assets\\css\\element\/imagelist.css"}
                });
            

            new NextendElementList({
              hidden: "nextendtype",
              multiple: 0,
              value: "wordpress"
            });
        

            new NextendElementSubform({
              hidden: "nextendtype",
              origvalue: "wordpress",
              value: "wordpress",
              tab: "basic"
            });
        

            
            var a = new NextendWindow({
              button: dojo.byId("nextendtypenextend-type-button"),
              node: dojo.byId("nextendtypenextend-type-lightbox"),
              save: dojo.byId("nextendtypenextend-type-save")
            });
        

            new NextendElementList({
              hidden: "wordpressmenunextendwordpressmenu_0",
              multiple: 0,
              value: "189"
            });
        

            new NextendElementList({
              hidden: "wordpressmenunextendwordpressmenu_1",
              multiple: 1,
              value: "0"
            });
        

            new NextendElementMixed({
              hidden: "nextendwordpressmenu",
              elements: ["wordpressmenunextendwordpressmenu_0","wordpressmenunextendwordpressmenu_1"],
              separator: "|*|"
            });
        

            new NextendElementMenuWithItems({
              hidden: "nextendwordpressmenu",
              options: {"189":[[454,"- Restaurant"],[455,"- Acas\u0103"]]},
              value: "189|*|0"
            });
        

            new NextendElementOnoff({
              hidden: "nextendrootasitem"
            });
        

            new NextendElementOnoff({
              hidden: "nextenddisplaynum"
            });
        

            new NextendElementList({
              hidden: "nextendtheme",
              multiple: 0,
              value: "default"
            });
        

            new NextendElementSubform({
              hidden: "nextendtheme",
              origvalue: "default",
              value: "default",
              tab: "basic"
            });
        

            
            var a = new NextendWindow({
              button: dojo.byId("nextendthemenextend-theme-button"),
              node: dojo.byId("nextendthemenextend-theme-lightbox"),
              save: dojo.byId("nextendthemenextend-theme-save")
            });
        

            new NextendElementList({
              hidden: "skinsnextendskins_0",
              multiple: 0,
              value: ""
            });
        

            new NextendElementSkin({
              hidden: "skinsnextendskins_0",
              preid: "nextend",
              skins: {"classic":{"level1border":"0|*|0|*|1|*|0|*|px|*|e0e0e0|*|solid","level2border":"0|*|0|*|1|*|0|*|px|*|e0e0e0|*|solid","level3border":"0|*|0|*|1|*|0|*|px|*|e0e0e0|*|solid","level4border":"0|*|0|*|1|*|0|*|px|*|e0e0e0|*|solid","level5border":"0|*|0|*|5|*|0|*|px|*|e0e0e0|*|solid"}}
            });
        

            new NextendElementList({
              hidden: "skinsnextendskins_1",
              multiple: 0,
              value: ""
            });
        

            new NextendElementSkin({
              hidden: "skinsnextendskins_1",
              preid: "nextend",
              skins: {"resetleft":{"level1minus":"exp2.png|*|left|*|d66060ff|*|1","level1plus":"exp2.png|*|left|*|57883bff|*|1","level2minus":"exp2.png|*|left|*|d66060ff|*|1","level2plus":"exp2.png|*|left|*|57883bff|*|1","level3minus":"exp2.png|*|left|*|d66060ff|*|1","level3plus":"exp2.png|*|left|*|57883bff|*|1","level4minus":"exp2.png|*|left|*|d66060ff|*|1","level4plus":"exp2.png|*|left|*|57883bff|*|1","level5minus":"exp2.png|*|left|*|d66060ff|*|1","level5plus":"exp2.png|*|left|*|57883bff|*|1","level1margin":"0|*|0|*|0|*|0|*|px","level1padding":"2|*|0|*|2|*|20|*|px","level2margin":"0|*|0|*|0|*|15|*|px","level2padding":"2|*|0|*|2|*|20|*|px","level3margin":"0|*|0|*|0|*|30|*|px","level3padding":"2|*|0|*|2|*|20|*|px","level4margin":"0|*|0|*|0|*|45|*|px","level4padding":"2|*|0|*|2|*|20|*|px","level5margin":"0|*|0|*|0|*|60|*|px","level5padding":"2|*|0|*|2|*|20|*|px"},"resetright":{"level1minus":"exp2.png|*|right|*|d66060ff|*|1","level1plus":"exp2.png|*|right|*|57883bff|*|1","level2minus":"exp2.png|*|right|*|d66060ff|*|1","level2plus":"exp2.png|*|right|*|57883bff|*|1","level3minus":"exp2.png|*|right|*|d66060ff|*|1","level3plus":"exp2.png|*|right|*|57883bff|*|1","level4minus":"exp2.png|*|right|*|d66060ff|*|1","level4plus":"exp2.png|*|right|*|57883bff|*|1","level5minus":"exp2.png|*|right|*|d66060ff|*|1","level5plus":"exp2.png|*|right|*|57883bff|*|1","level1margin":"0|*|0|*|0|*|0|*|px","level1padding":"2|*|22|*|2|*|5|*|px","level2margin":"0|*|0|*|0|*|15|*|px","level2padding":"2|*|22|*|2|*|5|*|px","level3margin":"0|*|0|*|0|*|30|*|px","level3padding":"2|*|22|*|2|*|5|*|px","level4margin":"0|*|0|*|0|*|60|*|px","level4padding":"2|*|22|*|2|*|5|*|px"}}
            });
        

            new NextendElementList({
              hidden: "skinsnextendskins_2",
              multiple: 0,
              value: ""
            });
        

            new NextendElementSkin({
              hidden: "skinsnextendskins_2",
              preid: "nextend",
              skins: {"reset":{"titlefont":"{\"firsttab\":\"Text\",\"Text\":{\"color\":\"135cae\",\"size\":\"18||px\",\"tshadow\":\"0|*|0|*|0|*|000000FF\",\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Arimo);),Arial\",\"lineheight\":\"21px\",\"bold\":1,\"italic\":0,\"underline\":0,\"align\":\"center\"}}","level1textfont":"{\"firsttab\":\"Text\",\"Text\":{\"color\":\"333333ff\",\"size\":\"12||px\",\"tshadow\":\"0|*|0|*|0|*|000000FF\",\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Arimo);),Arial\",\"lineheight\":\"20px\",\"bold\":0,\"italic\":0,\"underline\":0,\"align\":\"left\"},\"Active\":{\"bold\":\"1\",\"color\":\"135cae\"},\"Link\":{},\"Hover\":{\"color\":\"135cae\"},\"firsttab\":\"Text\"}","level2textfont":"{\"firsttab\":\"Text\",\"Text\":{\"color\":\"333333ff\",\"size\":\"12||px\",\"tshadow\":\"0|*|0|*|0|*|000000FF\",\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Arimo);),Arial\",\"lineheight\":\"20px\",\"bold\":0,\"italic\":0,\"underline\":0,\"align\":\"left\"},\"Active\":{\"bold\":\"1\",\"color\":\"135cae\"},\"Link\":{},\"Hover\":{\"color\":\"135cae\"},\"firsttab\":\"Text\"}","level3textfont":"{\"firsttab\":\"Text\",\"Text\":{\"color\":\"333333ff\",\"size\":\"12||px\",\"tshadow\":\"0|*|0|*|0|*|000000FF\",\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Arimo);),Arial\",\"lineheight\":\"20px\",\"bold\":0,\"italic\":0,\"underline\":0,\"align\":\"left\"},\"Active\":{\"bold\":\"1\",\"color\":\"135cae\"},\"Link\":{},\"Hover\":{\"color\":\"135cae\"},\"firsttab\":\"Text\"}","level4textfont":"{\"firsttab\":\"Text\",\"Text\":{\"color\":\"333333ff\",\"size\":\"12||px\",\"tshadow\":\"0|*|0|*|0|*|000000FF\",\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Arimo);),Arial\",\"lineheight\":\"20px\",\"bold\":0,\"italic\":0,\"underline\":0,\"align\":\"left\"},\"Active\":{\"bold\":\"1\",\"color\":\"135cae\"},\"Link\":{},\"Hover\":{\"color\":\"135cae\"},\"firsttab\":\"Text\"}","level5textfont":"{\"firsttab\":\"Text\",\"Text\":{\"color\":\"333333ff\",\"size\":\"12||px\",\"tshadow\":\"0|*|0|*|0|*|000000FF\",\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Arimo);),Arial\",\"lineheight\":\"20px\",\"bold\":0,\"italic\":0,\"underline\":0,\"align\":\"left\"},\"Active\":{\"bold\":\"1\",\"color\":\"135cae\"},\"Link\":{},\"Hover\":{\"color\":\"135cae\"},\"firsttab\":\"Text\"}"},"ltr":{"level1textfont":"{\"Text\":{\"align\":\"left\"}}","level2textfont":"{\"Text\":{\"align\":\"left\"}}","level3textfont":"{\"Text\":{\"align\":\"left\"}}","level4textfont":"{\"Text\":{\"align\":\"left\"}}","level5textfont":"{\"Text\":{\"align\":\"left\"}}"},"rtl":{"level1textfont":"{\"Text\":{\"align\":\"right\"}}","level2textfont":"{\"Text\":{\"align\":\"right\"}}","level3textfont":"{\"Text\":{\"align\":\"right\"}}","level4textfont":"{\"Text\":{\"align\":\"right\"}}","level5textfont":"{\"Text\":{\"align\":\"right\"}}"},"arial":{"titlefont":"{\"Text\":{\"afont\":\"Arial\"}}","level1textfont":"{\"Text\":{\"afont\":\"Arial\"}}","level2textfont":"{\"Text\":{\"afont\":\"Arial\"}}","level3textfont":"{\"Text\":{\"afont\":\"Arial\"}}","level4textfont":"{\"Text\":{\"afont\":\"Arial\"}}","level5textfont":"{\"Text\":{\"afont\":\"Arial\"}}"},"arimo":{"titlefont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Arimo);),sans-serif\"}}","level1textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Arimo);),sans-serif\"}}","level2textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Arimo);),sans-serif\"}}","level3textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Arimo);),sans-serif\"}}","level4textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Arimo);),sans-serif\"}}","level5textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Arimo);),sans-serif\"}}"},"cabin":{"titlefont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Cabin);),sans-serif\"}}","level1textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Cabin);),sans-serif\"}}","level2textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Cabin);),sans-serif\"}}","level3textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Cabin);),sans-serif\"}}","level4textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Cabin);),sans-serif\"}}","level5textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Cabin);),sans-serif\"}}"},"opensans":{"titlefont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Open+Sans);),sans-serif\"}}","level1textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Open+Sans);),sans-serif\"}}","level2textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Open+Sans);),sans-serif\"}}","level3textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Open+Sans);),sans-serif\"}}","level4textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Open+Sans);),sans-serif\"}}","level5textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Open+Sans);),sans-serif\"}}"},"ptsans":{"titlefont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=PT+Sans);),sans-serif\"}}","level1textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=PT+Sans);),sans-serif\"}}","level2textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=PT+Sans);),sans-serif\"}}","level3textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=PT+Sans);),sans-serif\"}}","level4textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=PT+Sans);),sans-serif\"}}","level5textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=PT+Sans);),sans-serif\"}}"},"quattrocentosans":{"titlefont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Quattrocento+Sans);),sans-serif\"}}","level1textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Quattrocento+Sans);),sans-serif\"}}","level2textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Quattrocento+Sans);),sans-serif\"}}","level3textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Quattrocento+Sans);),sans-serif\"}}","level4textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Quattrocento+Sans);),sans-serif\"}}","level5textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Quattrocento+Sans);),sans-serif\"}}"},"rosario":{"titlefont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Rosario);),sans-serif\"}}","level1textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Rosario);),sans-serif\"}}","level2textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Rosario);),sans-serif\"}}","level3textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Rosario);),sans-serif\"}}","level4textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Rosario);),sans-serif\"}}","level5textfont":"{\"Text\":{\"afont\":\"google(@import url(http:\/\/fonts.googleapis.com\/css?family=Rosario);),sans-serif\"}}"}}
            });
        

            new NextendElementMixed({
              hidden: "nextendskins",
              elements: ["skinsnextendskins_0","skinsnextendskins_1","skinsnextendskins_2"],
              separator: "|*|"
            });
        

            new NextendElementText({
              hidden: "fontmanagerfamily"
            });
        

            new NextendElementText({
              hidden: "fontmanagercolor"
            });
        

            new NextendElementColor({
              hidden: "fontmanagercolor",
              alpha: 1
            });
        

            new NextendElementText({
              hidden: "sizefontmanagersize_0"
            });
        

            new NextendElementSwitcher({
              hidden: "sizefontmanagersize_1",
              values: ["px","em"]
            });
        

            new NextendElementMixed({
              hidden: "fontmanagersize",
              elements: ["sizefontmanagersize_0","sizefontmanagersize_1"],
              separator: "|*|"
            });
        

            new NextendElementText({
              hidden: "fontmanagerlineheight"
            });
        

            new NextendElementCheckbox({
              hidden: "fontmanagerdecoration",
              values: ["bold","italic","underline"]
            });
        

            new NextendElementText({
              hidden: "fontmanagerpaddingleft"
            });
        

            new NextendElementRadio({
              hidden: "fontmanagertextalign",
              values: ["left","center","right","justify"]
            });
        

            new NextendElementText({
              hidden: "tshadowfontmanagertshadow_0"
            });
        

            new NextendElementText({
              hidden: "tshadowfontmanagertshadow_1"
            });
        

            new NextendElementText({
              hidden: "tshadowfontmanagertshadow_2"
            });
        

            new NextendElementText({
              hidden: "tshadowfontmanagertshadow_3"
            });
        

            new NextendElementColor({
              hidden: "tshadowfontmanagertshadow_3",
              alpha: 1
            });
        

            new NextendElementMixed({
              hidden: "fontmanagertshadow",
              elements: ["tshadowfontmanagertshadow_0","tshadowfontmanagertshadow_1","tshadowfontmanagertshadow_2","tshadowfontmanagertshadow_3"],
              separator: "|*|"
            });
        

            new NextendFontmanager({
              node: "nextend-fontmanager-lightbox-03e53b7b5a6cc2dbcfa19de03d2707b7"
            });
        

            new NextendElementFontmanager({
                hidden: "nextendtitlefont",
                button: "nextend-titlefont-button",
                importbtn: "nextend-titlefont-button-import",
                exportbtn: "nextend-titlefont-button-export",
                message: "nextend-titlefont-message",
                tabs: ["Text"],
                firsttab: "Text"
            });
        

            new NextendElementText({
              hidden: "marginnextendmargin_0"
            });
        

            new NextendElementText({
              hidden: "marginnextendmargin_1"
            });
        

            new NextendElementText({
              hidden: "marginnextendmargin_2"
            });
        

            new NextendElementText({
              hidden: "marginnextendmargin_3"
            });
        

            new NextendElementSwitcher({
              hidden: "marginnextendmargin_4",
              values: ["px","em"]
            });
        

            new NextendElementMixed({
              hidden: "nextendmargin",
              elements: ["marginnextendmargin_0","marginnextendmargin_1","marginnextendmargin_2","marginnextendmargin_3","marginnextendmargin_4"],
              separator: "|*|"
            });
        

            new NextendElementText({
              hidden: "level1marginnextendlevel1margin_0"
            });
        

            new NextendElementText({
              hidden: "level1marginnextendlevel1margin_1"
            });
        

            new NextendElementText({
              hidden: "level1marginnextendlevel1margin_2"
            });
        

            new NextendElementText({
              hidden: "level1marginnextendlevel1margin_3"
            });
        

            new NextendElementSwitcher({
              hidden: "level1marginnextendlevel1margin_4",
              values: ["px","em"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel1margin",
              elements: ["level1marginnextendlevel1margin_0","level1marginnextendlevel1margin_1","level1marginnextendlevel1margin_2","level1marginnextendlevel1margin_3","level1marginnextendlevel1margin_4"],
              separator: "|*|"
            });
        

            new NextendElementText({
              hidden: "level1paddingnextendlevel1padding_0"
            });
        

            new NextendElementText({
              hidden: "level1paddingnextendlevel1padding_1"
            });
        

            new NextendElementText({
              hidden: "level1paddingnextendlevel1padding_2"
            });
        

            new NextendElementText({
              hidden: "level1paddingnextendlevel1padding_3"
            });
        

            new NextendElementSwitcher({
              hidden: "level1paddingnextendlevel1padding_4",
              values: ["px","em"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel1padding",
              elements: ["level1paddingnextendlevel1padding_0","level1paddingnextendlevel1padding_1","level1paddingnextendlevel1padding_2","level1paddingnextendlevel1padding_3","level1paddingnextendlevel1padding_4"],
              separator: "|*|"
            });
        

            new NextendElementText({
              hidden: "level1bordernextendlevel1border_0"
            });
        

            new NextendElementText({
              hidden: "level1bordernextendlevel1border_1"
            });
        

            new NextendElementText({
              hidden: "level1bordernextendlevel1border_2"
            });
        

            new NextendElementText({
              hidden: "level1bordernextendlevel1border_3"
            });
        

            new NextendElementSwitcher({
              hidden: "level1bordernextendlevel1border_4",
              values: ["px","em"]
            });
        

            new NextendElementText({
              hidden: "level1bordernextendlevel1border_5"
            });
        

            new NextendElementColor({
              hidden: "level1bordernextendlevel1border_5",
              alpha: 0
            });
        

            new NextendElementText({
              hidden: "level1bordernextendlevel1border_6"
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel1border",
              elements: ["level1bordernextendlevel1border_0","level1bordernextendlevel1border_1","level1bordernextendlevel1border_2","level1bordernextendlevel1border_3","level1bordernextendlevel1border_4","level1bordernextendlevel1border_5","level1bordernextendlevel1border_6"],
              separator: "|*|"
            });
        

            new NextendElementRadio({
              hidden: "level1minusnextendlevel1minus_0",
              values: ["-1","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/1minus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/exp2.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/plus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/small.png"]
            });
        

            new NextendElementRadio({
              hidden: "level1minusnextendlevel1minus_1",
              values: ["left","right"]
            });
        

            new NextendElementText({
              hidden: "level1minusnextendlevel1minus_2"
            });
        

            new NextendElementColor({
              hidden: "level1minusnextendlevel1minus_2",
              alpha: 1
            });
        

            new NextendElementSwitcher({
              hidden: "level1minusnextendlevel1minus_3",
              values: ["1","0"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel1minus",
              elements: ["level1minusnextendlevel1minus_0","level1minusnextendlevel1minus_1","level1minusnextendlevel1minus_2","level1minusnextendlevel1minus_3"],
              separator: "|*|"
            });
        

            new NextendElementRadio({
              hidden: "level1plusnextendlevel1plus_0",
              values: ["-1","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/1plus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/exp2.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/plus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/small.png"]
            });
        

            new NextendElementRadio({
              hidden: "level1plusnextendlevel1plus_1",
              values: ["left","right"]
            });
        

            new NextendElementText({
              hidden: "level1plusnextendlevel1plus_2"
            });
        

            new NextendElementColor({
              hidden: "level1plusnextendlevel1plus_2",
              alpha: 1
            });
        

            new NextendElementSwitcher({
              hidden: "level1plusnextendlevel1plus_3",
              values: ["1","0"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel1plus",
              elements: ["level1plusnextendlevel1plus_0","level1plusnextendlevel1plus_1","level1plusnextendlevel1plus_2","level1plusnextendlevel1plus_3"],
              separator: "|*|"
            });
        

            new NextendElementFontmanager({
                hidden: "nextendlevel1textfont",
                button: "nextend-level1textfont-button",
                importbtn: "nextend-level1textfont-button-import",
                exportbtn: "nextend-level1textfont-button-export",
                message: "nextend-level1textfont-message",
                tabs: ["Text","Active","Link","Hover"],
                firsttab: "Text"
            });
        

            new NextendElementText({
              hidden: "level2marginnextendlevel2margin_0"
            });
        

            new NextendElementText({
              hidden: "level2marginnextendlevel2margin_1"
            });
        

            new NextendElementText({
              hidden: "level2marginnextendlevel2margin_2"
            });
        

            new NextendElementText({
              hidden: "level2marginnextendlevel2margin_3"
            });
        

            new NextendElementSwitcher({
              hidden: "level2marginnextendlevel2margin_4",
              values: ["px","em"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel2margin",
              elements: ["level2marginnextendlevel2margin_0","level2marginnextendlevel2margin_1","level2marginnextendlevel2margin_2","level2marginnextendlevel2margin_3","level2marginnextendlevel2margin_4"],
              separator: "|*|"
            });
        

            new NextendElementText({
              hidden: "level2paddingnextendlevel2padding_0"
            });
        

            new NextendElementText({
              hidden: "level2paddingnextendlevel2padding_1"
            });
        

            new NextendElementText({
              hidden: "level2paddingnextendlevel2padding_2"
            });
        

            new NextendElementText({
              hidden: "level2paddingnextendlevel2padding_3"
            });
        

            new NextendElementSwitcher({
              hidden: "level2paddingnextendlevel2padding_4",
              values: ["px","em"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel2padding",
              elements: ["level2paddingnextendlevel2padding_0","level2paddingnextendlevel2padding_1","level2paddingnextendlevel2padding_2","level2paddingnextendlevel2padding_3","level2paddingnextendlevel2padding_4"],
              separator: "|*|"
            });
        

            new NextendElementText({
              hidden: "level2bordernextendlevel2border_0"
            });
        

            new NextendElementText({
              hidden: "level2bordernextendlevel2border_1"
            });
        

            new NextendElementText({
              hidden: "level2bordernextendlevel2border_2"
            });
        

            new NextendElementText({
              hidden: "level2bordernextendlevel2border_3"
            });
        

            new NextendElementSwitcher({
              hidden: "level2bordernextendlevel2border_4",
              values: ["px","em"]
            });
        

            new NextendElementText({
              hidden: "level2bordernextendlevel2border_5"
            });
        

            new NextendElementColor({
              hidden: "level2bordernextendlevel2border_5",
              alpha: 0
            });
        

            new NextendElementText({
              hidden: "level2bordernextendlevel2border_6"
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel2border",
              elements: ["level2bordernextendlevel2border_0","level2bordernextendlevel2border_1","level2bordernextendlevel2border_2","level2bordernextendlevel2border_3","level2bordernextendlevel2border_4","level2bordernextendlevel2border_5","level2bordernextendlevel2border_6"],
              separator: "|*|"
            });
        

            new NextendElementRadio({
              hidden: "level2minusnextendlevel2minus_0",
              values: ["-1","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/1minus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/exp2.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/plus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/small.png"]
            });
        

            new NextendElementRadio({
              hidden: "level2minusnextendlevel2minus_1",
              values: ["left","right"]
            });
        

            new NextendElementText({
              hidden: "level2minusnextendlevel2minus_2"
            });
        

            new NextendElementColor({
              hidden: "level2minusnextendlevel2minus_2",
              alpha: 1
            });
        

            new NextendElementSwitcher({
              hidden: "level2minusnextendlevel2minus_3",
              values: ["1","0"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel2minus",
              elements: ["level2minusnextendlevel2minus_0","level2minusnextendlevel2minus_1","level2minusnextendlevel2minus_2","level2minusnextendlevel2minus_3"],
              separator: "|*|"
            });
        

            new NextendElementRadio({
              hidden: "level2plusnextendlevel2plus_0",
              values: ["-1","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/1plus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/exp2.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/plus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/small.png"]
            });
        

            new NextendElementRadio({
              hidden: "level2plusnextendlevel2plus_1",
              values: ["left","right"]
            });
        

            new NextendElementText({
              hidden: "level2plusnextendlevel2plus_2"
            });
        

            new NextendElementColor({
              hidden: "level2plusnextendlevel2plus_2",
              alpha: 1
            });
        

            new NextendElementSwitcher({
              hidden: "level2plusnextendlevel2plus_3",
              values: ["1","0"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel2plus",
              elements: ["level2plusnextendlevel2plus_0","level2plusnextendlevel2plus_1","level2plusnextendlevel2plus_2","level2plusnextendlevel2plus_3"],
              separator: "|*|"
            });
        

            new NextendElementFontmanager({
                hidden: "nextendlevel2textfont",
                button: "nextend-level2textfont-button",
                importbtn: "nextend-level2textfont-button-import",
                exportbtn: "nextend-level2textfont-button-export",
                message: "nextend-level2textfont-message",
                tabs: ["Text","Active","Link","Hover"],
                firsttab: "Text"
            });
        

            new NextendElementText({
              hidden: "level3marginnextendlevel3margin_0"
            });
        

            new NextendElementText({
              hidden: "level3marginnextendlevel3margin_1"
            });
        

            new NextendElementText({
              hidden: "level3marginnextendlevel3margin_2"
            });
        

            new NextendElementText({
              hidden: "level3marginnextendlevel3margin_3"
            });
        

            new NextendElementSwitcher({
              hidden: "level3marginnextendlevel3margin_4",
              values: ["px","em"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel3margin",
              elements: ["level3marginnextendlevel3margin_0","level3marginnextendlevel3margin_1","level3marginnextendlevel3margin_2","level3marginnextendlevel3margin_3","level3marginnextendlevel3margin_4"],
              separator: "|*|"
            });
        

            new NextendElementText({
              hidden: "level3paddingnextendlevel3padding_0"
            });
        

            new NextendElementText({
              hidden: "level3paddingnextendlevel3padding_1"
            });
        

            new NextendElementText({
              hidden: "level3paddingnextendlevel3padding_2"
            });
        

            new NextendElementText({
              hidden: "level3paddingnextendlevel3padding_3"
            });
        

            new NextendElementSwitcher({
              hidden: "level3paddingnextendlevel3padding_4",
              values: ["px","em"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel3padding",
              elements: ["level3paddingnextendlevel3padding_0","level3paddingnextendlevel3padding_1","level3paddingnextendlevel3padding_2","level3paddingnextendlevel3padding_3","level3paddingnextendlevel3padding_4"],
              separator: "|*|"
            });
        

            new NextendElementText({
              hidden: "level3bordernextendlevel3border_0"
            });
        

            new NextendElementText({
              hidden: "level3bordernextendlevel3border_1"
            });
        

            new NextendElementText({
              hidden: "level3bordernextendlevel3border_2"
            });
        

            new NextendElementText({
              hidden: "level3bordernextendlevel3border_3"
            });
        

            new NextendElementSwitcher({
              hidden: "level3bordernextendlevel3border_4",
              values: ["px","em"]
            });
        

            new NextendElementText({
              hidden: "level3bordernextendlevel3border_5"
            });
        

            new NextendElementColor({
              hidden: "level3bordernextendlevel3border_5",
              alpha: 0
            });
        

            new NextendElementText({
              hidden: "level3bordernextendlevel3border_6"
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel3border",
              elements: ["level3bordernextendlevel3border_0","level3bordernextendlevel3border_1","level3bordernextendlevel3border_2","level3bordernextendlevel3border_3","level3bordernextendlevel3border_4","level3bordernextendlevel3border_5","level3bordernextendlevel3border_6"],
              separator: "|*|"
            });
        

            new NextendElementRadio({
              hidden: "level3minusnextendlevel3minus_0",
              values: ["-1","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/1minus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/exp2.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/plus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/small.png"]
            });
        

            new NextendElementRadio({
              hidden: "level3minusnextendlevel3minus_1",
              values: ["left","right"]
            });
        

            new NextendElementText({
              hidden: "level3minusnextendlevel3minus_2"
            });
        

            new NextendElementColor({
              hidden: "level3minusnextendlevel3minus_2",
              alpha: 1
            });
        

            new NextendElementSwitcher({
              hidden: "level3minusnextendlevel3minus_3",
              values: ["1","0"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel3minus",
              elements: ["level3minusnextendlevel3minus_0","level3minusnextendlevel3minus_1","level3minusnextendlevel3minus_2","level3minusnextendlevel3minus_3"],
              separator: "|*|"
            });
        

            new NextendElementRadio({
              hidden: "level3plusnextendlevel3plus_0",
              values: ["-1","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/1plus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/exp2.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/plus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/small.png"]
            });
        

            new NextendElementRadio({
              hidden: "level3plusnextendlevel3plus_1",
              values: ["left","right"]
            });
        

            new NextendElementText({
              hidden: "level3plusnextendlevel3plus_2"
            });
        

            new NextendElementColor({
              hidden: "level3plusnextendlevel3plus_2",
              alpha: 1
            });
        

            new NextendElementSwitcher({
              hidden: "level3plusnextendlevel3plus_3",
              values: ["1","0"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel3plus",
              elements: ["level3plusnextendlevel3plus_0","level3plusnextendlevel3plus_1","level3plusnextendlevel3plus_2","level3plusnextendlevel3plus_3"],
              separator: "|*|"
            });
        

            new NextendElementFontmanager({
                hidden: "nextendlevel3textfont",
                button: "nextend-level3textfont-button",
                importbtn: "nextend-level3textfont-button-import",
                exportbtn: "nextend-level3textfont-button-export",
                message: "nextend-level3textfont-message",
                tabs: ["Text","Active","Link","Hover"],
                firsttab: "Text"
            });
        

            new NextendElementText({
              hidden: "level4marginnextendlevel4margin_0"
            });
        

            new NextendElementText({
              hidden: "level4marginnextendlevel4margin_1"
            });
        

            new NextendElementText({
              hidden: "level4marginnextendlevel4margin_2"
            });
        

            new NextendElementText({
              hidden: "level4marginnextendlevel4margin_3"
            });
        

            new NextendElementSwitcher({
              hidden: "level4marginnextendlevel4margin_4",
              values: ["px","em"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel4margin",
              elements: ["level4marginnextendlevel4margin_0","level4marginnextendlevel4margin_1","level4marginnextendlevel4margin_2","level4marginnextendlevel4margin_3","level4marginnextendlevel4margin_4"],
              separator: "|*|"
            });
        

            new NextendElementText({
              hidden: "level4paddingnextendlevel4padding_0"
            });
        

            new NextendElementText({
              hidden: "level4paddingnextendlevel4padding_1"
            });
        

            new NextendElementText({
              hidden: "level4paddingnextendlevel4padding_2"
            });
        

            new NextendElementText({
              hidden: "level4paddingnextendlevel4padding_3"
            });
        

            new NextendElementSwitcher({
              hidden: "level4paddingnextendlevel4padding_4",
              values: ["px","em"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel4padding",
              elements: ["level4paddingnextendlevel4padding_0","level4paddingnextendlevel4padding_1","level4paddingnextendlevel4padding_2","level4paddingnextendlevel4padding_3","level4paddingnextendlevel4padding_4"],
              separator: "|*|"
            });
        

            new NextendElementText({
              hidden: "level4bordernextendlevel4border_0"
            });
        

            new NextendElementText({
              hidden: "level4bordernextendlevel4border_1"
            });
        

            new NextendElementText({
              hidden: "level4bordernextendlevel4border_2"
            });
        

            new NextendElementText({
              hidden: "level4bordernextendlevel4border_3"
            });
        

            new NextendElementSwitcher({
              hidden: "level4bordernextendlevel4border_4",
              values: ["px","em"]
            });
        

            new NextendElementText({
              hidden: "level4bordernextendlevel4border_5"
            });
        

            new NextendElementColor({
              hidden: "level4bordernextendlevel4border_5",
              alpha: 0
            });
        

            new NextendElementText({
              hidden: "level4bordernextendlevel4border_6"
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel4border",
              elements: ["level4bordernextendlevel4border_0","level4bordernextendlevel4border_1","level4bordernextendlevel4border_2","level4bordernextendlevel4border_3","level4bordernextendlevel4border_4","level4bordernextendlevel4border_5","level4bordernextendlevel4border_6"],
              separator: "|*|"
            });
        

            new NextendElementRadio({
              hidden: "level4minusnextendlevel4minus_0",
              values: ["-1","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/1minus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/exp2.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/plus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/small.png"]
            });
        

            new NextendElementRadio({
              hidden: "level4minusnextendlevel4minus_1",
              values: ["left","right"]
            });
        

            new NextendElementText({
              hidden: "level4minusnextendlevel4minus_2"
            });
        

            new NextendElementColor({
              hidden: "level4minusnextendlevel4minus_2",
              alpha: 1
            });
        

            new NextendElementSwitcher({
              hidden: "level4minusnextendlevel4minus_3",
              values: ["1","0"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel4minus",
              elements: ["level4minusnextendlevel4minus_0","level4minusnextendlevel4minus_1","level4minusnextendlevel4minus_2","level4minusnextendlevel4minus_3"],
              separator: "|*|"
            });
        

            new NextendElementRadio({
              hidden: "level4plusnextendlevel4plus_0",
              values: ["-1","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/1plus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/exp2.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/plus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/small.png"]
            });
        

            new NextendElementRadio({
              hidden: "level4plusnextendlevel4plus_1",
              values: ["left","right"]
            });
        

            new NextendElementText({
              hidden: "level4plusnextendlevel4plus_2"
            });
        

            new NextendElementColor({
              hidden: "level4plusnextendlevel4plus_2",
              alpha: 1
            });
        

            new NextendElementSwitcher({
              hidden: "level4plusnextendlevel4plus_3",
              values: ["1","0"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel4plus",
              elements: ["level4plusnextendlevel4plus_0","level4plusnextendlevel4plus_1","level4plusnextendlevel4plus_2","level4plusnextendlevel4plus_3"],
              separator: "|*|"
            });
        

            new NextendElementFontmanager({
                hidden: "nextendlevel4textfont",
                button: "nextend-level4textfont-button",
                importbtn: "nextend-level4textfont-button-import",
                exportbtn: "nextend-level4textfont-button-export",
                message: "nextend-level4textfont-message",
                tabs: ["Text","Active","Link","Hover"],
                firsttab: "Text"
            });
        

            new NextendElementText({
              hidden: "level5marginnextendlevel5margin_0"
            });
        

            new NextendElementText({
              hidden: "level5marginnextendlevel5margin_1"
            });
        

            new NextendElementText({
              hidden: "level5marginnextendlevel5margin_2"
            });
        

            new NextendElementText({
              hidden: "level5marginnextendlevel5margin_3"
            });
        

            new NextendElementSwitcher({
              hidden: "level5marginnextendlevel5margin_4",
              values: ["px","em"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel5margin",
              elements: ["level5marginnextendlevel5margin_0","level5marginnextendlevel5margin_1","level5marginnextendlevel5margin_2","level5marginnextendlevel5margin_3","level5marginnextendlevel5margin_4"],
              separator: "|*|"
            });
        

            new NextendElementText({
              hidden: "level5paddingnextendlevel5padding_0"
            });
        

            new NextendElementText({
              hidden: "level5paddingnextendlevel5padding_1"
            });
        

            new NextendElementText({
              hidden: "level5paddingnextendlevel5padding_2"
            });
        

            new NextendElementText({
              hidden: "level5paddingnextendlevel5padding_3"
            });
        

            new NextendElementSwitcher({
              hidden: "level5paddingnextendlevel5padding_4",
              values: ["px","em"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel5padding",
              elements: ["level5paddingnextendlevel5padding_0","level5paddingnextendlevel5padding_1","level5paddingnextendlevel5padding_2","level5paddingnextendlevel5padding_3","level5paddingnextendlevel5padding_4"],
              separator: "|*|"
            });
        

            new NextendElementText({
              hidden: "level5bordernextendlevel5border_0"
            });
        

            new NextendElementText({
              hidden: "level5bordernextendlevel5border_1"
            });
        

            new NextendElementText({
              hidden: "level5bordernextendlevel5border_2"
            });
        

            new NextendElementText({
              hidden: "level5bordernextendlevel5border_3"
            });
        

            new NextendElementSwitcher({
              hidden: "level5bordernextendlevel5border_4",
              values: ["px","em"]
            });
        

            new NextendElementText({
              hidden: "level5bordernextendlevel5border_5"
            });
        

            new NextendElementColor({
              hidden: "level5bordernextendlevel5border_5",
              alpha: 0
            });
        

            new NextendElementText({
              hidden: "level5bordernextendlevel5border_6"
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel5border",
              elements: ["level5bordernextendlevel5border_0","level5bordernextendlevel5border_1","level5bordernextendlevel5border_2","level5bordernextendlevel5border_3","level5bordernextendlevel5border_4","level5bordernextendlevel5border_5","level5bordernextendlevel5border_6"],
              separator: "|*|"
            });
        

            new NextendElementRadio({
              hidden: "level5minusnextendlevel5minus_0",
              values: ["-1","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/1minus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/exp2.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/plus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/minus\/small.png"]
            });
        

            new NextendElementRadio({
              hidden: "level5minusnextendlevel5minus_1",
              values: ["left","right"]
            });
        

            new NextendElementText({
              hidden: "level5minusnextendlevel5minus_2"
            });
        

            new NextendElementColor({
              hidden: "level5minusnextendlevel5minus_2",
              alpha: 1
            });
        

            new NextendElementSwitcher({
              hidden: "level5minusnextendlevel5minus_3",
              values: ["1","0"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel5minus",
              elements: ["level5minusnextendlevel5minus_0","level5minusnextendlevel5minus_1","level5minusnextendlevel5minus_2","level5minusnextendlevel5minus_3"],
              separator: "|*|"
            });
        

            new NextendElementRadio({
              hidden: "level5plusnextendlevel5plus_0",
              values: ["-1","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/1plus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/exp2.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/plus.png","C:\/xampp\/htdocs\/wp-content\/plugins\/nextend-accordion-menu\/library\/assets\/accordionmenu\/images\/default\/plus\/small.png"]
            });
        

            new NextendElementRadio({
              hidden: "level5plusnextendlevel5plus_1",
              values: ["left","right"]
            });
        

            new NextendElementText({
              hidden: "level5plusnextendlevel5plus_2"
            });
        

            new NextendElementColor({
              hidden: "level5plusnextendlevel5plus_2",
              alpha: 1
            });
        

            new NextendElementSwitcher({
              hidden: "level5plusnextendlevel5plus_3",
              values: ["1","0"]
            });
        

            new NextendElementMixed({
              hidden: "nextendlevel5plus",
              elements: ["level5plusnextendlevel5plus_0","level5plusnextendlevel5plus_1","level5plusnextendlevel5plus_2","level5plusnextendlevel5plus_3"],
              separator: "|*|"
            });
        

            new NextendElementFontmanager({
                hidden: "nextendlevel5textfont",
                button: "nextend-level5textfont-button",
                importbtn: "nextend-level5textfont-button-import",
                exportbtn: "nextend-level5textfont-button-export",
                message: "nextend-level5textfont-message",
                tabs: ["Text","Active","Link","Hover"],
                firsttab: "Text"
            });
        

            new NextendElementOnoff({
              hidden: "nextendmoduleshowtitle"
            });
        

            new NextendElementOnoff({
              hidden: "nextendparentlink"
            });
        

            new NextendElementRadio({
              hidden: "nextendaccordionmode",
              values: ["1","2","0"]
            });
        

            new NextendElementRadio({
              hidden: "nextendmode",
              values: ["onclick","onmouseenter","both"]
            });
        

            new NextendElementRadio({
              hidden: "nextendactive",
              values: ["0","1","2"]
            });
        

            new NextendElementRadio({
              hidden: "nextendopened",
              values: ["0","-1","1","2","3"]
            });
        

            new NextendElementList({
              hidden: "nextendopenedlevels",
              multiple: 1,
              value: ""
            });
        

            new NextendElementText({
              hidden: "slicenextendslice_0"
            });
        

            new NextendElementText({
              hidden: "slicenextendslice_1"
            });
        

            new NextendElementOnoff({
              hidden: "slicenextendslice_2"
            });
        

            new NextendElementMixed({
              hidden: "nextendslice",
              elements: ["slicenextendslice_0","slicenextendslice_1","slicenextendslice_2"],
              separator: "|*|"
            });
        

            new NextendElementOnoff({
              hidden: "nextendcss3animation"
            });
        

            new NextendElementText({
              hidden: "animationnextendanimation_0"
            });
        

            new NextendElementList({
              hidden: "animationnextendanimation_1",
              multiple: 0,
              value: "dojo.fx.easing.cubicInOut"
            });
        

            new NextendElementList({
              hidden: "animationnextendanimation_2",
              multiple: 0,
              value: "dojo.fx.easing.cubicInOut"
            });
        

            new NextendElementMixed({
              hidden: "nextendanimation",
              elements: ["animationnextendanimation_0","animationnextendanimation_1","animationnextendanimation_2"],
              separator: "|*|"
            });
        

            new NextendElementOnoff({
              hidden: "nextendsnaptobottom"
            });
        

            new NextendElementText({
              hidden: "nextendclass_sfx"
            });
        

            new NextendElementOnoff({
              hidden: "nextendhtml5"
            });
        

            new NextendElementOnoff({
              hidden: "nextendnoscript"
            });
        
}); })(ndojo);
(function($){ $(document).ready(function() {$(".nextend-hastip").qtip({
                position: {
                    my: "bottom center",
                    at: "top right"
                },
                style: {
                    tip: {                        
                        width: 12,
                        height: 6
                    }
                }
            });
            $(".nextend-element-hastip").qtip({
                position: {
                    my: "bottom center",
                    at: "top center"
                },
                style: {
                    tip: {                        
                        width: 12,
                        height: 6
                    }
                }
            });
        
}); })(jQuery);

