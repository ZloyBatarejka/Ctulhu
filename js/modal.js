const ANIMATION_SPEED_MODAL = 500;
function _createModalHTML(options){
	$modal = document.createElement("modal");
	$modal.classList.add("ymodal");

	$modal.innerHTML = `
		<div data-close="true" class="overlay">
			<div class="modal-window">
				<div class="modal-title">
					<h1>${options.title}</h1>
					<span data-close="true" class="close">&#10006</span>
				</div>
				<div class="modal-body">
					${renderBody(options.text)}
				</div>
			</div>
		</div>
	`
	document.body.append($modal);

	return $modal;
}

function createModalController(options){
	const modal = _createModalHTML(options);

	const UI = {
		open(){
			setTimeout(()=>{
				modal.classList.add("open");
			},1)
		},
		close(){
			setTimeout(()=>{
				modal.classList.remove("open");
			},1)
		},
		destroy(){
			UI.close();
			setTimeout(()=>{
				modal.remove();
			},ANIMATION_SPEED_MODAL)
		}

	}
	function closer(event){
		if(event.target.dataset.close){
			UI.destroy();
		}
	}
	modal.addEventListener("click",closer);
	return UI;
}

function renderBody(array){
	let html = "";
	array.forEach(item=>{
		html+=`<p>${item}</p>`
	})
	return html;
}