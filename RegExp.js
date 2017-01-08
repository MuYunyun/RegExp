// 没选中替换则不能输入
function hideReplaceFields() {
	document.getElementById('RegExReplace').disabled = true;
	document.getElementById('replaceheader').disabled = true;
}

// 点击替换则能输入
function showReplaceFields() {
	document.getElementById('RegExReplace').disabled = false;
	document.getElementById('replaceheader').disabled = false;
}

function processRegexFind(text, regex, flags) {
	var reg = new RegExp(regex, flags);
	var lastIdx = -1;
	var iCount = 0;
	var result = "";
	var output = '<div style="height:200px;overflow-y:auto;width:550"><table border="0" cellpadding="2" cellspacing="0" width="550"><tr><th width="*">匹配内容</th><th>位置</th><th>长度</th></tr>'

	// 循环
	while (lastIdx != 0) {
		var mtch = reg.exec(text);
		if (reg.lastIndex !== 0) { //lastIndex属性存放一个整数，它声明的是上一次匹配文本之后的第一个字符的位置。
			iCount++;
			if (iCount % 2) {
				style = "RowA"
			} else style = "RowB";
			// 输出
			output += '<tr class="' + style + '"><td>' + RegExp.lastMatch + '</td><td>' + (reg.lastIndex - RegExp.lastMatch.length) + '</td><td>' + RegExp.lastMatch.length + '</td></tr>';
		}
		lastIdx = reg.lastIndex;
	}
	output += '</table></div>';

	if (iCount !== 0) {
		result = "匹配个数: " + iCount + output;
	} else result = '未找到匹配的项';
	return result;
}

// 替换
function processRegexReplace(text, regexfind, regexreplace, flags) {
	var re = new RegExp(regexfind, flags);
	var newstr = text.replace(re, regexreplace);
	var result = '<div style="height:200px;overflow-y:auto;width:550"><table border="0" cellpadding="2" cellspacing="0" width="550"><tr><th>替换后：</th></tr><tr><td>' + newstr + '</td></tr>';
	return result;
}

// 人口
function processRegex(form) {
	var output = '';
	var flags;
	if (form.caseSensitive.checked) flags = "g";
	else flags = "gi";
	//判断是查找还是替换
	if (form.operationFind.checked) {
		output = processRegexFind(form.searchText.value, form.RegEx.value, flags);
	} else if (form.operationReplace.checked) {
		output = processRegexReplace(form.searchText.value, form.RegEx.value, form.RegExReplace.value, flags);
	}

	document.getElementById('output').innerHTML = output;
	return false;
}