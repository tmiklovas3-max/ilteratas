<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2685.4">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; -webkit-text-stroke: #000000}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; -webkit-text-stroke: #000000; min-height: 14.0px}
    span.s1 {font-kerning: none}
  </style>
</head>
<body>
<p class="p1"><span class="s1">const canvas = document.getElementById("wheel");</span></p>
<p class="p1"><span class="s1">const ctx = canvas.getContext("2d");</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">let segments = 100;</span></p>
<p class="p1"><span class="s1">let angle = 0;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// Automatinis canvas resize full screen</span></p>
<p class="p1"><span class="s1">function resize() {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>canvas.width = Math.min(window.innerWidth, window.innerHeight) * 0.8;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>canvas.height = canvas.width; // kvadratinis canvas</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>draw(angle);</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">window.addEventListener("resize", resize);</span></p>
<p class="p1"><span class="s1">resize();</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">const arc = 2 * Math.PI / segments;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">function draw(rotation = 0) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>const cx = canvas.width / 2;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>const cy = canvas.height / 2;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>const radius = canvas.width / 2 - 10;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>ctx.clearRect(0, 0, canvas.width, canvas.height);</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>for (let i = 0; i &lt; segments; i++) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>ctx.beginPath();</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>ctx.fillStyle = i % 2 ? "#ddd" : "#bbb";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>ctx.moveTo(cx, cy);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>ctx.arc(cx, cy, radius, i*arc+rotation, (i+1)*arc+rotation);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>ctx.fill();</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>ctx.save();</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>ctx.translate(cx, cy);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>ctx.rotate(i*arc + arc/2 + rotation);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>ctx.fillStyle = "black";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>ctx.font = `${Math.floor(radius/12)}px Arial`;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>ctx.fillText(i+1, radius - 30, 5);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>ctx.restore();</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>// rodyklė</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>ctx.fillStyle = "red";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>ctx.beginPath();</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>ctx.moveTo(cx, 10);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>ctx.lineTo(cx - 15, 40);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>ctx.lineTo(cx + 15, 40);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>ctx.fill();</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">draw();</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">function spin() {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>let targetIndex = 19;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>let targetAngle = (2*Math.PI) - (targetIndex * arc) - arc/2;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>let final = 10 * 2*Math.PI + targetAngle;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>let start = null;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>function animate(t) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if (!start) start = t;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>let progress = (t - start) / 4000;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if (progress &gt; 1) progress = 1;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>let ease = 1 - Math.pow(1 - progress, 3);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>angle = final * ease;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>draw(angle);</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if (progress &lt; 1) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>requestAnimationFrame(animate);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>} else {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>alert("Laimėjai: 20 🎉");</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>requestAnimationFrame(animate);</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// Mygtuko paspaudimas</span></p>
<p class="p1"><span class="s1">document.getElementById("spinBtn").addEventListener("click", spin);</span></p>
</body>
</html>
