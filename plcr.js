#!/usr/bin/env node

let URL = require('url').URL;

let playlist_link = '';
let counter       = 0;
let loop          = false;

function generate(arr)
{
    arr.forEach((link) =>
    {
        if(link.match(/https:\/\/www.youtube.com\/watch\?v=.+/) !== null)
        {
            if(counter > 1)
            {
                playlist_link +=
                    ',' + new URL(link).searchParams.get('v');
            }
            else if(counter === 1)
            {
                playlist_link +=
                    '?playlist=' + new URL(link).searchParams.get('v');
            }
            else
            {
                playlist_link =
                    'https://www.youtube.com/embed/'
                    + new URL(link).searchParams.get('v');
            }

            ++counter;
        }
        else if(link === '-l' || link === '--loop')
        {
            loop = true;
        }
        else if(link === '-h' || link === '--help')
        {
            console.info(
`plcr

    Generates youtube playlist links given video urls

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

Bugs/Fix

    Repository: https://github.com/dxwc/plcr/
    Report here: https://github.com/dxwc/plcr/issues

----------------------------------------------------------------------------
This software was not produced by or directly for YouTube, LLC and has no
affiliation with the LLC. Use this software only at your own volition.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`
            );
            process.exit(0);
        }
        else if(link === '-v' || link === '--version')
        {
            console.info('plcr 0.0.1');
            process.exit(0);
        }
        else
        {
            console.error('SKIPPING INVALID URL/OPTION->', link);
            console.info();
        }
    });
}

if(process.argv.length > 2)
{
    generate(process.argv.slice(2));
    playlist_link +=
        `${counter > 1 ? '&' : '?'}rel=0${loop ? '&loop=1' : ''}&modestbranding=1`;
    console.info();
    console.info(playlist_link);
}
else
{
    let content = '';
    process.stdin.resume();
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', (data) => content += data);
    process.stdin.on('_socketEnd', () =>
    {
        process.stdin.end();
        generate(content.split('\n').filter((val) => val.length));
        console.info();
        console.info(playlist_link);
    });
}