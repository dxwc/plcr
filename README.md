[ Use from `npm`, Repository/master is currently a construction site ]

A simple script to generate youtube playlist link given video urls (no youtube account needed)

# Setup


1. Have [Node.js](https://nodejs.org/en/) installed (any version
   higher than 6 should be fine)

### Option 1

2. Save [plcr.js](https://raw.githubusercontent.com/dxwc/plcr/master/plcr.js) and use it as a script
    + Example A: On linux, `cd` to saved and run `chmod u+x plcr.js`, it will now be available for use from the directory by name `./plcr.js`
    + Example B: `cd` in saved dir and run directly with node, ex: `node plcr.js`

### Option 2

2. Run command `npm install -g plcr` to install it from npm globally, `plcr` will be
   available for use from any directory
    + To update to latest version anytime after installation, re-run above command
    + To uninstall, run `npm uninstall -g plcr`
    + _Unix may need `sudo`_
    + _Windows may need running cmd as admistrator_

# Use

```
Usages

    plcr url1 url2 url3 ...
    pipe-urls-seperated-by-newlines | plcr

Options

    NOTE: urls have to be in form https://www.youtube.com/watch/v?=...
    NOTE: Options are not available for use with pipe

    -l, --loop
        Make playlist loop
    -v, --version
        Prints version
    -h, --help
        Print this help
```

----------------------------------------------------------------------------
This software was not produced by or directly for YouTube, LLC and has no
affiliation with the LLC. Use this software only at your own volition.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.