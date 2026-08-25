param(
  [Parameter(Mandatory=$true)][string]$Folder,
  [Parameter(Mandatory=$true)][string]$CommitMsg
)

$master = "Day-01-Semantic-HTML"

copy "$master\index.html" "$Folder\index.html"
copy "$master\style.css"  "$Folder\style.css"
copy "$master\script.js"  "$Folder\script.js"

foreach ($img in "anant.jfif","abhay1.jfif","pavithra.jfif","harshit.jfif") {
  copy "$master\$img" "$Folder\$img"
}

Write-Host "Day-01 master copied into $Folder."

git add $Folder
git commit -m $CommitMsg
git push
