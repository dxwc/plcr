A simple command line program to generate youtube playlist given video URLs

# Why

You don't have to have a google account to make video playlist

# Install

+ Have [Node.js](https://nodejs.org/) installed
+ Run command **`npm install -g plcr@latest`** and you are all set
    + To update to latest version anytime after installation, run: `npm update -g plcr`
    + To uninstall, run: `npm uninstall -g plcr`
    + _Unix may need `sudo` before commands_
    + _Windows may need running cmd as administrator_

# Use

+ Run and see: `plcr --help`
+ Example usages :
    + `plcr -l -a https://www.youtube.com/watch?v=C0DPdy98e4c https://www.youtube.com/watch?v=ucZl6vQ_8Uo`
    + With stdin file redirect : `plcr -p --shhh < list.txt` where `list.txt` contains :
```https://www.youtube.com/watch?v=6kOU0uusKPE
https://www.youtube.com/watch?v=UZSTBv4EWnU
https://www.youtube.com/watch?v=QGraGWtktrk
https://www.youtube.com/watch?v=B3AEQqjqr68
https://www.youtube.com/watch?v=nKxmqgcjzAU
https://www.youtube.com/watch?v=gOFDFogc6Gk
https://www.youtube.com/watch?v=iE_bw4ME9v8
https://www.youtube.com/watch?v=yzoeXkdxKuc
https://www.youtube.com/watch?v=h11ASFLXPjg
```
+ **Note**: options can not be combined

---

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.