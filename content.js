(function(){

	var player = {};

	window.onload = function(){
		player = document.getElementsByClassName("bilibili-player-area")[0];
		player.videoArea = player.children[1];
		player.control = player.children[2];
		player.sendBar = player.children[3];
		player.progressBar = player.control.children[1].children[0].children[0].children[0]

		player.togglePlay = function(){
			this.control.children[0].click();
		};
		player.toggleDanmu = function(){
			this.control.children[5].click();
			this.control.children[5].children[2].style.visibility = "hidden";
		};
		player.toggleWidescreen = function(){
			this.control.children[7].click();
		}

		player.progressBar.updateProgress = function(){
			this.progress = this.children[2].getAttribute("style").split(":")[1];
			this.progress = this.progress.substring(0, this.progress.length - 2);
			this.progress = parseFloat(this.progress);
		}
		player.progressBar.timeshiftToPercentage = function(to){
			var rect = this.getBoundingClientRect();
			var x = rect.left;
			var y = rect.top;
			var width = rect.width;
			x = x + width * to * 0.01;
			this.click(x,y);
		}
		player.progressBar.timeshiftByPercentage = function(by){
			this.updateProgress();
			var to = this.progress + by;
			this.timeshiftToPercentage(to);
		}
		player.progressBar.click = function(x,y){
			var mousedown= document.createEvent('MouseEvents');
			mousedown.initMouseEvent('mousedown', true, true, window, 0,0, 0, x, y, false, false,false, false, 0, null);
			this.dispatchEvent(mousedown);
			var mouseup= document.createEvent('MouseEvents');
			mouseup.initMouseEvent('mouseup', true, true, window, 0,0, 0, x, y, false, false,false, false, 0, null);
			this.dispatchEvent(mouseup);
		}

		player.repetition = {
			set: function(a,b){
				this.a = a;
				this.b = b;
			},
			start: function(){
				player.progressBar.timeshiftToPercentage(this.a);
			// observe on the progress, if it reaches b; playback
				repetition = window.setInterval(function(){
					player.progressBar.updateProgress();
					console.log(player.progressBar.progress);
					if(player.progressBar.progress > player.repetition.b){
						player.progressBar.timeshiftToPercentage(this.a);
						console.log("repeated");
					}
				},50);
			},
			cancel: function(){
				window.clearInterval(repetition);
				console.log("canceled");
			}
		};

		// Change the player UI, hide unuseful parts, and make video area bigger.
		player.children[0].style.visibility = "hidden";
		player.toggleWidescreen();
		player.toggleDanmu();

		// Set danmu mode to bottom
		player.sendBar.children[3].children[0].children[1].children[1].children[2].click();
		// remind user that the damu mode is changed
		//todo: 写一个提醒模块 message.js

		// ajax to load view from template html
		var loadTemplate = function(url){
			var xmlHttp = new XMLHttpRequest();
			var result;
			xmlHttp.onreadystatechange = function(){
				if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
					result = xmlHttp.responseText;
				}
			};
			xmlHttp.open("GET",url,false);
			xmlHttp.send();
			return xmlHttp.responseText;
		};
		


		// jimaku, our custom-made ui
		var playerWrapper = player.parentNode.parentNode.parentNode.parentNode;
		var jmkTextArea = loadTemplate(chrome.extension.getURL("templates/textarea.html"));
		console.log(jmkTextArea);

		//TODO:Here
		// playerWrapper.insertBefore(jmkTextArea,playerWrapper.firstChild);
		// var jimaku = {
		// 	textArea: {},
		// 	list: {},
		// 	data:
		// 	controller:
		// }
		

	}

})();

/*todo:
1.bilibili播放控制（播放暂停，快进快退，AB重复）
简化（去侧栏，关弹幕，去广告）
增加大字号输入框（浮于视频下方）
增加已添加字幕列表（浮于视频右方），可调换位置，可删除；可选择添加字幕模式（回车添加，回车后确认添加，全部保存后稍后添加）
2.保存字幕至本地功能，输出csv
3.快捷键：
空格键播放暂停，左右键快进或快退一次（连按可防止进度条弹回）
按A B可设定AB重复点，按esc取消重复
按回车添加弹幕
4.提醒模块
5.optional 集成字典

*/