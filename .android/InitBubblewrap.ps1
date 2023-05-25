param(
    [Parameter(Mandatory=$true,
    ValueFromPipeline=$true)]
    [string] $manifestUrl
  )

# $1 url to manifest (e.g.: https://grades.luvdav.com/manifest.json)
npm i -g @bubblewrap/cli
bubblewrap init --manifest=$manifestUrl --directory="output/android"