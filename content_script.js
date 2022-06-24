// [引用元](https://zenn.dev/masa5714/articles/826e806d1bd340)
function scrapingWaitingForTheElement(targetElement, waitingTime = 30) {
	return new Promise(function (resolve, reject) {
		let timer, timeout;

		// タイムアウトを設定（デフォルト: 30秒、この時間までに要素出力を確認できなければエラー扱いになる）
		timeout = setTimeout(function () {
			clearInterval(timer);
			reject(new Error(targetElement + " の取得に失敗しました。"));
		}, waitingTime * 1000);

		timer = setInterval(function () {
			if (document.querySelectorAll(targetElement).length > 0) {
				clearInterval(timer);
				clearTimeout(timeout);
				resolve();
			}
		}, 250); // 250ミリ秒毎にチェックを実行
	});
}

(async function () {
	try {
		await scrapingWaitingForTheElement("span.nickname-1PaREw", 30);
	} catch (e) {
		console.log(e);
	}

	let materialData = () => {
		const reaction_list = document.querySelectorAll("span.nickname-1PaREw");
		let plist = "";
		for (let i = 0; i < reaction_list.length; i++) {
			plist = plist + reaction_list[i].textContent + "\n";
		}
		console.log(plist);
		navigator.clipboard.writeText(plist);
	};
	materialData();
})();
