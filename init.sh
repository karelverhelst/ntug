alias cluster1="ssh admin@192.168.0.101"
alias cluster3="ssh admin@192.168.0.103"
alias k=kubectl

sudo apt install -y nfs-common
sudo apt install -y mysql-client


rke1

k create ns ntug
k apply -f pvc-web.yaml -n ntug
k apply -f pvc-mariadb.yaml -n ntug

web=$(k get pvc -n ntug | grep web | awk {'print$3'} | grep -o '....$')
mariadb=$(k get pvc -n ntug | grep mariadb | awk {'print$3'} | grep -o '....$')

cluster1 vol show | grep $web > web.txt
cluster1 vol show | grep $mariadb > mariadb.txt

volweb=$(cat web.txt | awk{'print$2'} )
volmariadb=$(cat mariadb.txt | awk {'print$2'} )

sudo mkdir /mnt/web
sudo mount 192.168.0.131:/$volweb /mnt/web
sudo mkdir /mnt/mariadb
sudo mount 192.168.0.131:/$volmariadb /mnt/mariadb

sudo cp ntugmariadb.tgz /mnt/mariadb
sudo cp ntugweb.tgz /mnt/web

sudo tar -xzvf ntugmariadb.tgz
cd /mnt/mariadb/mnt/ntugmariadb
sudo cp -R  /mnt/mariadb

sudo tar -xzvf ntugweb.tgz
cd /mnt/mariadb/mnt/ntugweb
sudo cp -R  /mnt/mariadb


