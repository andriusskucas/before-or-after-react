<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class HomeController extends Controller
{
    /**
     * @Route("/", name="home")
     */
    public function indexAction()
    {
        $numberofquestions = $this->container->getParameter('numberofquestions');
        $time = $this->container->getParameter('time');

        return $this->render('base.html.twig', [
            'time' => $time,
            'numberofquestions' => $numberofquestions
        ]);
    }
}
