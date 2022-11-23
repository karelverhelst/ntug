sudo apt install -y nfs-common
sudo apt install -y mysql-client

rke1

kubectl create ns ntug
kubectl apply -f pvc-web.yaml -n ntug
kubectl apply -f pvc-mariadb.yaml -n ntug

sudo web=$(kubectl get pvc -n ntug | grep web | awk {'print$3'} | grep -o '....$')
sudo mariadb=$(kubectl get pvc -n ntug | grep mariadb | awk {'print$3'} | grep -o '....$')

ssh admin@192.168.0.101 vol show | grep $web > web.txt
ssh admin@192.168.0.101 vol show | grep $mariadb > mariadb.txt

sudo volweb=$(cat web.txt | awk {'print$2'})
sudo volmariadb=$(cat mariadb.txt | awk {'print$2'})


sudo mkdir /mnt/web
sudo mount 192.168.0.131:/$volweb /mnt/web
sudo mkdir /mnt/mariadb
sudo mount 192.168.0.131:/$volmariadb /mnt/mariadb

sudo tar -xzvf ntug.tgz

sudo cp -R /home/user/ntug/mnt/c/ntug/mariadb/* /mnt/mariadb
sudo cp -R /home/user/ntug/mnt/c/ntug/web/* /mnt/web

kubectl apply -f service-web.yaml -n ntug
kubectl apply -f service-mariadb.yaml -n ntug

kubectl apply -f deployment-web.yaml -n ntug
kubectl apply -f deployment-mariadb.yaml -n ntug

