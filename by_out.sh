#!/bin/bash

__root=`pwd`
cd ../
home=`pwd`
name=${__root##*/}
name=${name#*game_}
name="${name%_*}"

first_client_libs="${home}/first_client/first_main/libs"
first_release="${home}/first_release/common/part"

out_path="${home}/game_out"
out_first_main="${out_path}/first_main"
out_libs="${out_first_main}/libs"
release_lib="${home}/game_out/lib_release"
release="${home}/game_out/release"
make="${out_first_main}/make.sh"
src="${out_first_main}/src"
bin="${out_first_main}/bin"

if [[ "$name" =~ "component" ]];then
	rm -rf "${out_libs}/gamecomponent.d.ts"
	rm -rf "${out_libs}/gametongyong.d.ts"
	rm -rf "${out_libs}/gamedating.d.ts"
elif [[ "$name" =~ "dating" ]];then
	cp -rf "${out_libs}/gamecomponent.d.ts.dst" "${out_libs}/gamecomponent.d.ts"
	rm -rf "${out_libs}/gametongyong.d.ts"
	rm -rf "${out_libs}/gamedating.d.ts"
elif [[ "$name" =~ "tongyong" ]];then
	cp -rf "${out_libs}/gamedating.d.ts.dst" "${out_libs}/gamedating.d.ts"
	cp -rf "${out_libs}/gamecomponent.d.ts.dst" "${out_libs}/gamecomponent.d.ts"
	rm -rf "${out_libs}/gametongyong.d.ts"
else
	cp -rf "${out_libs}/gamecomponent.d.ts.dst" "${out_libs}/gamecomponent.d.ts"
	cp -rf "${out_libs}/gametongyong.d.ts.dst" "${out_libs}/gametongyong.d.ts"
	cp -rf "${out_libs}/gamedating.d.ts.dst" "${out_libs}/gamedating.d.ts"
fi

rm -rf "$release_lib"
rm -rf $src
rm -rf "${bin}/js"
cp -rf "${bin}/index.html.dst" "${bin}/index.html"
sed -i 's/"js\/tongyong\/MyInport\.js"/"js\/'"$name"'\/MyInport\.js"/g' "${bin}/index.html"
cp -rf "${out_first_main}/make.sh.dst" "${out_first_main}/make.sh"
sed -i 's/'tongyong'/'"$name"'/g' "${out_first_main}/make.sh"

if [ ! -d "$src" ];then
	mkdir "$src"
	touch "$src/1.ts"
fi

cp -rf "$__root" "$src"

cd "$out_first_main"

sh "$make"
if [ $? -ne '0' ]; then
	echo "make 异常请检查"
	exit 2
fi

if [[ "$name" =~ "tongyong" || "$name" =~ "component" || "$name" =~ "dating" ]];then
	cp -rf "$release_lib/1.0/${name}.d.ts" "${out_libs}/${name}.d.ts.dst"
	cp -rf "$release_lib/1.0/${name}.js" "${bin}/libs/${name}.js"
fi


if [ ! -f "$release_lib/1.0/$name.bin" ];then
	touch "$release_lib/1.0/$name.bin"
fi

python "${out_path}/pack.py" "${out_path}" "lib_release/1.0/${name}.bin" "lib_release/1.0/${name}.min.js"
if [ $? != 0 ]; then
	echo "脚本执行异常"
	exit 6
fi
rm -rf "$release_lib/1.0/$name.min.js"

cp -rf "$release_lib/1.0/${name}.js" "$first_release/js/"
cp -rf "$release_lib/1.0/${name}.bin" "$first_release/bin/"

mkdir -p "$first_release/tsd"
cp -rf "$release_lib/1.0/${name}.d.ts" "$first_release/tsd/${name}.d.ts.dst"

if [ ! -d "$release" ];then
	mkdir "$release"
fi
if [ ! -d "$release/ts" ];then
	mkdir "$release/ts"
fi
cp -rf "$release_lib/1.0/${name}.d.ts" "$release/ts"
if [ ! -d "$release/js" ];then
	mkdir "$release/js"
fi
cp -rf "$release_lib/1.0/${name}.js" "$release/js"
if [ ! -d "$release/bin" ];then
	mkdir "$release/bin"
fi
cp -rf "$release_lib/1.0/${name}.bin" "$release/bin"

exit 0

read -p "============finish============" var