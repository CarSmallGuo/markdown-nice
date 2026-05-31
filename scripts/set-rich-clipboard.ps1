param(
    [Parameter(Mandatory = $true)]
    [string]$HtmlPath,

    [Parameter(Mandatory = $true)]
    [string]$PlainPath
)

Add-Type -AssemblyName System.Windows.Forms

$encoding = [System.Text.Encoding]::UTF8
$html = [System.IO.File]::ReadAllText($HtmlPath, $encoding)
$plain = [System.IO.File]::ReadAllText($PlainPath, $encoding)

$headerTemplate = "Version:0.9`r`nStartHTML:{0:0000000000}`r`nEndHTML:{1:0000000000}`r`nStartFragment:{2:0000000000}`r`nEndFragment:{3:0000000000}`r`n"
$emptyHeader = [string]::Format($headerTemplate, 0, 0, 0, 0)
$beforeFragment = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><!--StartFragment-->'
$afterFragment = '<!--EndFragment--></body></html>'

$startHtml = $encoding.GetByteCount($emptyHeader)
$startFragment = $encoding.GetByteCount($emptyHeader + $beforeFragment)
$endFragment = $encoding.GetByteCount($emptyHeader + $beforeFragment + $html)
$endHtml = $encoding.GetByteCount($emptyHeader + $beforeFragment + $html + $afterFragment)

$header = [string]::Format($headerTemplate, $startHtml, $endHtml, $startFragment, $endFragment)
$cfHtml = $header + $beforeFragment + $html + $afterFragment

$dataObject = New-Object System.Windows.Forms.DataObject
$dataObject.SetText($plain, [System.Windows.Forms.TextDataFormat]::UnicodeText)
$dataObject.SetText($cfHtml, [System.Windows.Forms.TextDataFormat]::Html)
[System.Windows.Forms.Clipboard]::SetDataObject($dataObject, $true)
