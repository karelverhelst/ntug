sudo apt install -y nfs-common
sudo apt install -y mysql-client

rke1

kubectl create ns ntug
kubectl apply -f pvc-web.yaml -n ntug
kubectl apply -f pvc-mariadb.yaml -n ntug

web=$(kubectl get pvc -n ntug | grep web | awk {'print$3'} | grep -o '....$')
mariadb=$(kubectl get pvc -n ntug | grep mariadb | awk {'print$3'} | grep -o '....$')

ssh admin@192.168.30.101 vol show | grep $web > web.txt
ssh admin@192.168.30.101 vol show | grep $mariadb > mariadb.txt

volweb=$(cat web.txt | awk{'print$2'} )
volmariadb=$(cat mariadb.txt | awk {'print$2'} )

sudo mkdir /mnt/web
sudo mount 192.168.0.131:/$volweb /mnt/web
sudo mkdir /mnt/mariadb
sudo mount 192.168.0.131:/$volmariadb /mnt/mariadb

sudo tar -xzvf ntug.tgz


