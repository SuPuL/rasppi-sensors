export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.ico","favicon.png","robots.txt"]),
	_: {
		mime: {".ico":"image/vnd.microsoft.icon",".png":"image/png",".txt":"text/plain"},
		entry: {"file":"start-e72be9ad.js","js":["start-e72be9ad.js","chunks/vendor-21f7bf9f.js"],"css":["assets/start-61d1577b.css"]},
		nodes: [
			() => import('./server/nodes/0.js'),
			() => import('./server/nodes/1.js'),
			() => import('./server/nodes/2.js')
		],
		routes: [
			{
				type: 'page',
				pattern: /^\/$/,
				params: null,
				path: "/",
				a: [0,2],
				b: [1]
			}
		]
	}
};
