TOFIX: `name`, it's taken on `npm`, won't work

A script to generate youtube playlist links given video urls (no youtube account needed)

# Setup

1. Have [Node.js](https://nodejs.org/en/) installed (any version
   higher than 6 should be fine)
2. Run command `npm install -g plist` and you are all set
    + To update to latest version anytime after installation, re-run above command
    + To uninstall, run `npm uninstall -g plist`
    + _Unix may need `sudo`_
    + _Windows may need running cmd as admistrator_

# Usages example

`plist https://www.youtube.com/watch?v=xHu7qI1gDPA https://www.youtube.com/watch?v=2DrjQBL5FMU` will produce the url:

`https://www.youtube.com/embed/xHu7qI1gDPA?playlist=2DrjQBL5FMU&rel=0&modestbranding=1`

For above version, adding `-l` or `--loop` flag will crate looping playlist

If there is a file `foo.txt` with content:

```
https://www.youtube.com/watch?v=xHu7qI1gDPA
https://www.youtube.com/watch?v=2DrjQBL5FMU
```

If on linux, running bash shell command `cat foo.txt | plist` will output
`https://www.youtube.com/embed/xHu7qI1gDPA?playlist=2DrjQBL5FMU`

----
This software was not produced by or directly for YouTube, LLC and has no
affiliation with the LLC. Use this software only at your own volition.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.